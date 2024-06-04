import { atom, map } from "nanostores";

import { objectify, sleep } from "radash";

import { surrealdbWasmEngines } from "surrealdb.wasm";
import {
    Surreal,
    ScopeAuth,
    UUID,
    decodeCbor,
    VersionRetrievalFailure,
    UnsupportedVersion,
} from "surrealdb.js";

import {
    type AuthDetails,
    type ConnectionOptions,
    type Protocol,
    type QueryResponse,
} from "./types";

import * as states from "./states";
import { connectionUri } from "./helpers";

const SURREAL = new Surreal({
    engines: surrealdbWasmEngines() as any,
});

SURREAL.emitter.subscribe("disconnected", () => {
    states.connecting.set(false);
    states.connected.set(false);
    states.version.set("");

    console.log("[surreal] disconnected")
    //DisconnectedEvent.dispatch(null);
});

export async function disconnect() {
	const status = SURREAL.status;

	if (status === "connected" || status === "connecting") {
		await SURREAL.close();
		await sleep(100);
	}
}

export async function connect() {
    const options = states.connectionOptions.get();
    if (options == null) {
        console.error("[surreal] connection options is null");
        return;
    }
    await disconnect();

	const rpcEndpoint = connectionUri(options);

    console.log("[surreal] connecting:", options.protocol, options.hostname, options.namespace, options.database);
    states.connecting.set(true);
    states.connected.set(false);

    const isSignup = options.authMode === "scope-signup";
	const auth = composeAuthentication(options);

	await SURREAL.connect(rpcEndpoint, {
		versionCheckTimeout: options.versionCheckTimeoutMs,
		namespace: options.namespace,
		database: options.database,
		prepare: async (surreal) => {
			try {
				if (isSignup) {
					await register(buildScopeAuth(options), surreal);
				} else {
					await authenticate(auth, surreal, options);
				}
			} catch {
				throw new Error("Authentication failed");
			}
		},
	})
		.then(async () => {
			/*
            syncDatabaseSchema();

			ConnectedEvent.dispatch(null);

			posthog.capture('connection_open', {
				protocol: connection.protocol
			});
            */

			console.log("[surreal] connected to", options.protocol, options.hostname, options.authMode);

			states.connecting.set(false);
			states.connected.set(true);
		})
		.catch((err) => {
			SURREAL.close();

            states.connectionError.set(err);
			console.error("[surreal] connect failed:", err);

			states.connecting.set(false);
			states.connected.set(false);

            /*
			if (err instanceof VersionRetrievalFailure)
				return showWarning({
					title: "Failed to query version",
					subtitle: "The database version could not be determined. Please ensure the database is running and accessible by Surrealist."
				});

			if (err instanceof UnsupportedVersion)
				showError({
					title: "Unsupported version",
					subtitle: `The database version must be in range "${err.supportedRange}". The current version is ${err.version}`
				});

			showError({
				title: "Failed to connect",
				subtitle: err.message
			});
             */
		}).finally(() => {
			SURREAL.version().then((v) => {
				states.version.set(v);
			    console.log("[surreal] db version", v ?? "unknown");
			});
		});
	const infoResult = await SURREAL.info();
	console.log("[surreal] info result", infoResult);
	states.auth.set(infoResult);
}

/**
 * Compose authentication details for the given connection
 *
 * @param connection The connection options
 * @returns The authentication details
 */
export function composeAuthentication(connection: ConnectionOptions): AuthDetails {
	const { authMode, username, password, namespace, database, token } = connection;

	switch (authMode) {
		case "root": {
			return { username, password };
		}
		case "namespace": {
			return { namespace, username, password };
		}
		case "database": {
			return { namespace, database, username, password };
		}
		case "scope": {
			return buildScopeAuth(connection);
		}
		case "token": {
			return token;
		}
		default: {
			return undefined;
		}
	}
}

function buildScopeAuth(connection: ConnectionOptions): ScopeAuth {
	const { namespace, database, scope, scopeFields } = connection;
	const fields = objectify(scopeFields, f => f.subject, f => f.value);
	
	console.log("[surreal] scope auth:", namespace, database, scope, fields);
	return { namespace, database, scope, ...fields };
}

/**
 * Register a new scope user
 *
 * @param auth The authentication details
 * @param surreal The optional surreal instance
 */
export async function register(auth: ScopeAuth, surreal?: Surreal) {
	surreal ??= SURREAL;

	await surreal.signup(auth);
    /*
	await surreal.signup(auth).catch((err) => {
		throw new Error("Could not sign up");
	});
     */
}

/**
 * Authenticate the connection
 *
 * @param auth The authentication details
 * @param surreal The optional surreal instance
 */
export async function authenticate(auth: AuthDetails, surreal?: Surreal, options: ConnectionOptions) {
	surreal ??= SURREAL;
    console.log("[surreal] authenticate:", options.authMode, auth);

	if (auth === undefined) {
		await surreal.invalidate();
	} else if (typeof auth === "string") {
		await surreal.authenticate(auth).catch(() => {
			throw new Error("Authentication token invalid");
		});
	} else if (auth) {
		const signinResult = await surreal.signin(auth).catch(err => {
            throw err
            /* TODO
			const { openScopeSignup } = useInterfaceStore.getState();

			if (err.message.includes("No record was returned")) {
				openScopeSignup();
			} else {
				throw new Error(err.message);
			}
             */
		});
		console.log("[surreal] signin result", signinResult);
	}
}

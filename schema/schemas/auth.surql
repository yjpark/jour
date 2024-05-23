-- https://surrealdb.com/docs/surrealdb/security/authentication

DEFINE FUNCTION IF NOT EXISTS fn::allow_signup() {
    RETURN false;
};

DEFINE SCOPE IF NOT EXISTS admin SESSION 1d
	SIGNIN (
		SELECT * FROM ONLY user WHERE email = $email
            AND crypto::argon2::compare(password, $password)
            AND role = "admin"
			LIMIT 1
	)
	SIGNUP {
        THROW "SignUp not allowed!";
	};

DEFINE SCOPE IF NOT EXISTS editor SESSION 1d
	SIGNIN (
		SELECT * FROM ONLY user WHERE email = $email
            AND crypto::argon2::compare(password, $password)
            AND (role = "admin" OR role = "editor")
			LIMIT 1
	)
	SIGNUP {
        THROW "SignUp not allowed!";
	};

DEFINE SCOPE IF NOT EXISTS reader SESSION 1d
	SIGNIN (
		SELECT * FROM ONLY user WHERE email = $email
            AND crypto::argon2::compare(password, $password)
			LIMIT 1
	)
	SIGNUP {
        IF fn::allow_signup() THEN
            return fn::create_reader($email, $name, $password);
        ELSE {
            THROW "SignUp not allowed!";
        }
        END
	};

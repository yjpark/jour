DEFINE TABLE IF NOT EXISTS entry SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where true
        FOR create, update
            where ($scope = "editor") AND user = $auth.id
        FOR delete
            NONE;

DEFINE FIELD IF NOT EXISTS ver ON entry TYPE int
    DEFAULT 0
    VALUE ($before AND $before + 1) OR 1;

DEFINE FIELD IF NOT EXISTS user ON entry TYPE record<user>;

DEFINE FIELD IF NOT EXISTS kind ON entry TYPE string
    ASSERT $value = "node" OR $value = "list";

DEFINE FIELD IF NOT EXISTS text ON entry TYPE option<string>;

DEFINE FIELD IF NOT EXISTS data ON entry FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS links ON entry FLEXIBLE TYPE option<array<record<entry>>>;

DEFINE FIELD IF NOT EXISTS created_at ON entry TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON entry TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS entry_user_index ON entry COLUMNS user;
DEFINE INDEX IF NOT EXISTS entry_updated_at_index ON entry COLUMNS updated_at;

-- https://surrealdb.com/docs/surrealdb/surrealql/statements/define/indexes#full-text-search-index
DEFINE ANALYZER IF NOT EXISTS entry_text_analyzer TOKENIZERS blank FILTERS lowercase, snowball(english);
DEFINE INDEX IF NOT EXISTS entry_text_index ON entry COLUMNS text SEARCH ANALYZER entry_text_analyzer BM25 HIGHLIGHTS;

DEFINE EVENT entry_create_history ON entry WHEN $event = "CREATE" OR $event = "UPDATE" THEN (
    CREATE ONLY entry_history:[$after.id, $after.updated_at] CONTENT {
        ver: $after.ver,
        user: $after.user.id,
        kind: $after.kind,
        text: $after.text,
        data: $after.data,
        links: $after.links,
    }
);


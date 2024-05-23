-- ID: [entry.id, updated_at]

DEFINE TABLE IF NOT EXISTS entry_history SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where ($scope = "editor")
        FOR create, update, delete
            NONE;

DEFINE FIELD IF NOT EXISTS ver ON entry_history TYPE int
    READONLY;

DEFINE FIELD IF NOT EXISTS user ON entry_history TYPE record<user>
    READONLY;

DEFINE FIELD IF NOT EXISTS kind ON entry_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS text ON entry_history TYPE option<string>
    READONLY;

DEFINE FIELD IF NOT EXISTS data ON entry_history FLEXIBLE TYPE option<object>
    READONLY;

DEFINE FIELD IF NOT EXISTS links ON entry_history FLEXIBLE TYPE option<array<record<entry>>>
    READONLY;

-- https://surrealdb.com/docs/surrealdb/surrealql/statements/define/indexes#full-text-search-index
DEFINE INDEX IF NOT EXISTS entry_history_text_index ON entry_history COLUMNS text SEARCH ANALYZER entry_text_analyzer BM25 HIGHLIGHTS;
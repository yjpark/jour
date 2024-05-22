//ID: ulid()
DEFINE TABLE entry SCHEMAFULL TYPE NORMAL;

DEFINE FIELD author ON entry TYPE record<user>
    READONLY;

DEFINE FIELD text ON TABLE entry TYPE option<string>
    READONLY;

DEFINE FIELD data ON TABLE entry FLEXIBLE TYPE option<object>
    READONLY;

DEFINE FIELD created_at ON TABLE entry TYPE datetime
    READONLY
    VALUE date::now();

// https://surrealdb.com/docs/surrealdb/surrealql/statements/define/indexes#full-text-search-index
DEFINE INDEX entryTextIndex ON TABLE entry COLUMNS text SEARCH ANALYZER ascii BM25 HIGHLIGHTS;
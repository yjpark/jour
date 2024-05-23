-- ID: [jour.id, updated_at]

DEFINE TABLE IF NOT EXISTS jour_history SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where ($scope = "editor")
        FOR create, update, delete
            NONE;

DEFINE FIELD IF NOT EXISTS ver ON jour_history TYPE int
    READONLY;

DEFINE FIELD IF NOT EXISTS user ON jour_history TYPE record<user>
    READONLY;

DEFINE FIELD IF NOT EXISTS name ON jour_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS avatar ON jour_history TYPE option<string>
    READONLY;

DEFINE FIELD IF NOT EXISTS data ON jour_history FLEXIBLE TYPE option<object>
    READONLY;

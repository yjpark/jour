-- ID: [publish.id, updated_at]

DEFINE TABLE IF NOT EXISTS publish_history SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where ($scope = "editor")
        FOR create, update, delete
            NONE;

DEFINE FIELD IF NOT EXISTS in ON publish_history TYPE record<jour>
    READONLY;

DEFINE FIELD IF NOT EXISTS out ON publish_history TYPE record<entry>
    READONLY;

DEFINE FIELD IF NOT EXISTS ver ON publish_history TYPE int
    READONLY;

DEFINE FIELD IF NOT EXISTS user ON publish_history TYPE record<user>
    READONLY;

DEFINE FIELD IF NOT EXISTS slug ON publish_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS data ON publish_history FLEXIBLE TYPE option<object>
    READONLY;

DEFINE INDEX IF NOT EXISTS publish_history_in_slug_index ON publish_history COLUMNS in, slug;

DEFINE INDEX IF NOT EXISTS publish_history_out_index ON publish_history COLUMNS out;

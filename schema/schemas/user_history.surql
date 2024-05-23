-- ID: [user.id, updated_at]

DEFINE TABLE IF NOT EXISTS user_history SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where ($scope = "admin")
        FOR create, update, delete
            NONE;

DEFINE FIELD IF NOT EXISTS ver ON user_history TYPE int
    READONLY;

DEFINE FIELD IF NOT EXISTS email ON user_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS name ON user_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS password ON user_history TYPE string;

DEFINE FIELD IF NOT EXISTS avatar ON user_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS role ON user_history TYPE string
    READONLY;

DEFINE FIELD IF NOT EXISTS data ON user_history FLEXIBLE TYPE option<object>
    READONLY;

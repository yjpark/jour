-- ID: slug
DEFINE TABLE IF NOT EXISTS jour SCHEMAFULL TYPE NORMAL
    PERMISSIONS
        FOR select
            where true
        FOR create, update
            where ($scope = "editor") AND user = $auth.id
        FOR delete
            where ($scope = "admin");

DEFINE FIELD IF NOT EXISTS ver ON jour TYPE int
    DEFAULT 0
    VALUE ($before AND $before + 1) OR 1;

DEFINE FIELD IF NOT EXISTS user ON jour TYPE record<user>;

DEFINE FIELD IF NOT EXISTS name ON jour TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) > 0;

DEFINE FIELD IF NOT EXISTS avatar ON jour TYPE option<string>
    ASSERT $value = NONE OR string::is::url($value);

DEFINE FIELD IF NOT EXISTS data ON jour FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS created_at ON jour TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON jour TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS jour_user_index ON jour COLUMNS user;
DEFINE INDEX IF NOT EXISTS jour_updated_at_index ON jour COLUMNS updated_at;

DEFINE EVENT jour_create_history ON jour WHEN $event = "CREATE" OR $event = "UPDATE" THEN (
    CREATE ONLY jour_history:[$after.id, $after.updated_at] CONTENT {
        ver: $after.ver,
        user: $after.user.id,
        name: $after.name,
        avatar: $after.avatar,
        data: $after.data,
    }
);

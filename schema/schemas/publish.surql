DEFINE TABLE IF NOT EXISTS publish SCHEMAFULL TYPE RELATION FROM jour TO entry;

DEFINE FIELD IF NOT EXISTS ver ON publish TYPE int
    DEFAULT 0
    VALUE ($before AND $before + 1) OR 1;

DEFINE FIELD IF NOT EXISTS user ON publish TYPE record<user>;

DEFINE FIELD IF NOT EXISTS slug ON publish TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) >= 3;

DEFINE FIELD IF NOT EXISTS data ON publish FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS created_at ON publish TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON publish TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS publish_user_index ON publish COLUMNS user;
DEFINE INDEX IF NOT EXISTS publish_updated_at_index ON publish COLUMNS updated_at;

DEFINE INDEX IF NOT EXISTS publish_in_slug_index ON publish COLUMNS in, slug UNIQUE;

DEFINE INDEX IF NOT EXISTS publish_out_index ON publish COLUMNS out;

DEFINE EVENT publish_create_history ON publish WHEN $event = "CREATE" OR $event = "UPDATE" THEN (
    CREATE ONLY publish_history:[$after.id, $after.updated_at] CONTENT {
        in: $after.in,
        out: $after.out,
        ver: $after.ver,
        user: $after.user,
        slug: $after.slug,
        data: $after.data,
    }
);


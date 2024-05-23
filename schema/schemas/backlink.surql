DEFINE TABLE IF NOT EXISTS backlink SCHEMAFULL TYPE RELATION FROM entry TO entry;

DEFINE FIELD IF NOT EXISTS kind ON backlink TYPE string
    ASSERT $value = "weak" OR $value = "link" OR $value = "shadow";

DEFINE FIELD IF NOT EXISTS data ON backlink FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS created_at ON backlink TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON backlink TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS backlinked_updated_at_index ON backlink COLUMNS updated_at;

DEFINE INDEX IF NOT EXISTS backlink_in_out_index ON backlink COLUMNS in, out UNIQUE;

DEFINE INDEX IF NOT EXISTS backlink_out_index ON backlink COLUMNS out;

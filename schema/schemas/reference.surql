DEFINE TABLE IF NOT EXISTS reference SCHEMAFULL TYPE RELATION FROM jour TO entry
    PERMISSIONS
        FOR create, update
            where $auth.role = "admin" OR $auth.role = "editor"
        FOR delete
            where $auth.role = "admin";

DEFINE FIELD IF NOT EXISTS active ON reference TYPE bool
    DEFAULT true;

DEFINE FIELD IF NOT EXISTS data ON reference FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS created_at ON reference TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON reference TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS reference_updated_at_index ON reference COLUMNS updated_at;

DEFINE INDEX IF NOT EXISTS reference_in_out_index ON reference COLUMNS in, out UNIQUE;

DEFINE INDEX IF NOT EXISTS reference_out_index ON reference COLUMNS out;

//ID: slug
DEFINE TABLE jour SCHEMAFULL TYPE NORMAL;

DEFINE FIELD owner ON jour TYPE record<user>;

DEFINE FIELD name ON TABLE jour TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) > 0;

DEFINE FIELD avatar ON TABLE jour TYPE string
    ASSERT string::is::url($value);

DEFINE FIELD data ON TABLE jour FLEXIBLE TYPE option<object>;

DEFINE FIELD created_at ON TABLE jour TYPE datetime
    READONLY
    VALUE date::now();

DEFINE FIELD updated_at ON TABLE jour TYPE datetime
    VALUE date::now();

DEFINE INDEX jourUpdatedAtIndex ON TABLE jour COLUMNS updated_at;

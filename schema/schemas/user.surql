DEFINE TABLE user SCHEMAFULL TYPE NORMAL;

DEFINE FIELD email ON TABLE user TYPE string
    READONLY
    VALUE string::lowercase(string::trim($value))
    ASSERT string::is::email($value);

DEFINE FIELD name ON TABLE user TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) > 0;

DEFINE FIELD avatar ON TABLE user TYPE string
    ASSERT string::is::url($value);

DEFINE FIELD data ON TABLE user FLEXIBLE TYPE option<object>;

DEFINE FIELD created_at ON TABLE user TYPE datetime
    READONLY
    VALUE date::now();

DEFINE FIELD updated_at ON TABLE user TYPE datetime
    VALUE date::now();

DEFINE INDEX userEmailIndex ON TABLE user COLUMNS email UNIQUE;

DEFINE INDEX userUpdatedAtIndex ON TABLE user COLUMNS updated_at;
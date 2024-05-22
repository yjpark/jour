DEFINE TABLE publish TYPE RELATION;

DEFINE TABLE publish TYPE RELATION FROM jour TO entry;

DEFINE FIELD is_public ON TABLE publish TYPE boolean
    DEFAULT false;

DEFINE FIELD slug ON TABLE publish TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) >= 6;

DEFINE FIELD data ON TABLE publish FLEXIBLE TYPE option<object>;

DEFINE FIELD created_at ON TABLE publish TYPE datetime
    READONLY
    VALUE date::now();

DEFINE FIELD updated_at ON TABLE publish TYPE datetime
    VALUE date::now();

DEFINE INDEX publishUpdatedAtIndex ON TABLE publish COLUMNS updated_at;

DEFINE INDEX publishInSlugIndex ON TABLE publish FILEDS in, slug UNIQUE;

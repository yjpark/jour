DEFINE TABLE access TYPE RELATION;

DEFINE TABLE access TYPE RELATION FROM user TO jour;

DEFINE FIELD role ON TABLE access TYPE string
    ASSERT $value == "Admin" || $value == "Editor" || $value == "Reader";

DEFINE FIELD data ON TABLE access FLEXIBLE TYPE option<object>;

DEFINE FIELD created_at ON TABLE access TYPE datetime
    READONLY
    VALUE date::now();

DEFINE FIELD updated_at ON TABLE access TYPE datetime
    VALUE date::now();

DEFINE INDEX accessedUpdatedAtIndex ON TABLE access COLUMNS updated_at;

DEFINE INDEX accessInOutIndex ON TABLE access FILEDS in, out UNIQUE;

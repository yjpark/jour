DEFINE TABLE IF NOT EXISTS user SCHEMAFULL TYPE NORMAL
	PERMISSIONS
        FOR select
            WHERE $scope = "admin" OR $scope = "editor" OR $scope = "reader" OR id = $auth.id
		FOR create
            WHERE $scope = "admin" OR ($allowSignUp AND $scope = "reader")
		FOR update, delete
            WHERE $scope = "admin" OR ($allowSignUp AND $scope = "reader" AND id = $auth.id);

DEFINE FIELD IF NOT EXISTS ver ON user TYPE int
    DEFAULT 0
    VALUE ($before AND $before + 1) OR 1;

DEFINE FIELD IF NOT EXISTS email ON user TYPE string
    READONLY
    VALUE string::lowercase(string::trim($value))
    ASSERT string::is::email($value);

DEFINE FIELD IF NOT EXISTS name ON user TYPE string
    VALUE string::trim($value)
    ASSERT string::len($value) >= 3;

DEFINE FIELD IF NOT EXISTS password ON user TYPE string
    PERMISSIONS NONE;

DEFINE FIELD IF NOT EXISTS avatar ON user TYPE string
    ASSERT string::is::url($value);

DEFINE FIELD IF NOT EXISTS role ON user TYPE string
    ASSERT $value = "admin" OR $value = "editor" OR $value = "reader";

DEFINE FIELD IF NOT EXISTS data ON user FLEXIBLE TYPE option<object>;

DEFINE FIELD IF NOT EXISTS created_at ON user TYPE datetime
    READONLY
    DEFAULT time::now();

DEFINE FIELD IF NOT EXISTS updated_at ON user TYPE datetime
    VALUE time::now();

DEFINE INDEX IF NOT EXISTS user_email_index ON user COLUMNS email UNIQUE;
DEFINE INDEX IF NOT EXISTS user_updated_at_index ON user COLUMNS updated_at;

DEFINE EVENT user_create_history ON user WHEN $event = "CREATE" OR $event = "UPDATE" THEN (
    CREATE ONLY user_history:[$after.id, $after.updated_at] CONTENT {
        ver: $after.ver,
        email: $after.email,
        name: $after.name,
        password: $after.password,
        avatar: $after.avatar,
        role: $after.role,
        data: $after.data,
    }
);

DEFINE FUNCTION IF NOT EXISTS fn::create_user(
    $role: string,
    $email: string,
    $name: string,
    $password: string,
) {
    return CREATE ONLY user CONTENT {
        email: $email,
        name: $name,
        avatar: "https://gravatar.com/avatar/" + crypto::sha256($email) + "?d=identicon",
        password: crypto::argon2::generate($password),
        role: $role,
    }
} PERMISSIONS NONE;

DEFINE FUNCTION IF NOT EXISTS fn::create_reader(
    $email: string,
    $name: string,
    $password: string,
) {
    return fn::create_user("reader", $email, $name, $password);
};



DEFINE FUNCTION IF NOT EXISTS fn::create_jour(
    $slug: string,
    $user: record<user>,
    $name: string,
    $data: option<object>,
) {
    return CREATE ONLY type::thing("jour", string::lowercase(string::trim($slug))) CONTENT {
        user: $user,
        name: $name,
        data: $data,
    }
} PERMISSIONS NONE;

DEFINE FUNCTION IF NOT EXISTS fn::create_entry(
    $user: record<user>,
    $kind: string,
    $text: option<string>,
    $data: option<object>,
    $links: option<array<record<entry>>>,
) {
    return CREATE ONLY entry CONTENT {
        user: $user,
        kind: $kind,
        text: $text,
        data: $data,
        links: $links,
    }
} PERMISSIONS NONE;

DEFINE FUNCTION IF NOT EXISTS fn::relate_publish(
    $jour: record<jour>,
    $entry: record<entry>,
    $user: record<user>,
    $slug: string,
    $data: option<object>,
) {
    return RELATE ONLY
        $jour -> publish -> $entry CONTENT {
        user: $user,
        slug: string::lowercase(string::trim($slug)),
        data: $data,
    }
} PERMISSIONS NONE;




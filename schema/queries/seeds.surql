let $user = fn::create_user("admin", "yjpark@gmail.com", "YJ Park", "test");
-- let $user = select * from only user where email = "yjpark@gmail.com";
$user.id;

let $j1 = fn::create_jour("daily", $user.id, "Daily");
$j1.id;

let $j2 = fn::create_jour("test", $user.id, "Test");
$j2.id;

let $e1 = fn::create_entry($user.id, "node", "first entry");
$e1.id;

let $e2 = fn::create_entry($user.id, "node", "second entry");
$e2.id;

let $e3 = fn::create_entry($user.id, "node", "third entry");
$e3.id;

let $e4 = fn::create_entry($user.id, "list", "# LIST", NONE, [$e1.id, $e2.id, $e3.id]);
$e4.id;

-- relate_publish not working yet, the passed in and out got lost
-- let $p1 = fn::relate_publish($j1.id, $e1.id, $user.id, "temp");
-- $p1.id;

-- let $p2 = fn::relate_publish($j2.id, $e4.id, $user.id, "list");
-- $p2.id;

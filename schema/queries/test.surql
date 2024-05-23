let $t = time::from::nanos(1716422916091708817);

$t;

select * from user_history:[
			user:klklm0lykaljxhc0j4ps,
			$t,
		].. where id[0] = "user:klklm0lykaljxhc0j4ps";
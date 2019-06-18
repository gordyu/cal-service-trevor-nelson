import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
	vus      : 40,
	duration : '600s'
};

export default function() {
	let randomID = 900000 + Math.floor(Math.random() * 99000);
	let res = http.get(`http://localhost:3002/${randomID}`);
	check(res, {
		sucess : (r) => r.status == 200
	});
}

import http from 'k6/http';
import { check, sleep } from 'k6';
// import { mixedTypeAnnotation } from '@babel/types';

export let options = {
	vus      : 40,
	duration : '40s'
};

export default function() {
	var num = 2000000 + Math.floor(Math.random() * 999999999);
	const payload = {
		id            : num,
		listing_name  : 'trevors house of magic',
		host_name     : 'trevorJnelson',
		max_guests    : 20,
		listing_price : 200
	};
	const params = {
		headers : { 'Content-Type': 'application/json' }
	};
	var input = JSON.stringify(payload);
	let randomID = 900000 + Math.floor(Math.random() * 99000);
	let res = http.post(`http://localhost:3002/`, input, params);
	// let res = http.get(`http://localhost:3002/`);
	check(res, {
		sucess : (r) => r.status == 200
	});
}

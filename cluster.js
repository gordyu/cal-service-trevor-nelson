const cluster = require('cluster');

if (cluster.isMaster) {
	for (let i = 0; i < 3; i++) {
		cluster.fork();
	}
} else {
	require('./server/server.js');
}

'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
	port: 3000,
	host: 'localhost',
	router: {
		isCaseSensitive: false,
		stripTrailingSlash: true 
	}

});

server.app.author = 'Fabio Pagoti'

server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		console.log(request);
		return 'Hello, world!';
	}
});

server.route({
	method: 'GET',
	path: '/about',
	handler: (request, reply) => {
		return { author: request.server.app.author };
	}
});

server.route({
	method: 'GET',
	path: '/{name*2}',
	handler: (request, reply) => {
		return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
	}
});

server.route({ 
	method: 'GET',
	path: '/{p*}', 
	handler: (request, reply) => {
		return reply.response('Not found!!!').code(404);
	}
});

const init = async () => {

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
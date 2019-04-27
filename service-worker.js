
function refresh(){
	return caches.open('offline-v1').then(function(cache){
		return Promise.all([
            cache.add('/core-competencies.js'),
            cache.add('/engineering-competencies.js'),
            cache.add('/role-mappings.js'),
            cache.add('/styles/index.css'),
            cache.add('/scripts/handlebars-v4.1.2.js'),
            cache.add('/scripts/index.js'),
            cache.add('/images/favicon.ico'),
            cache.add('/images/logo.png'),
            cache.add('https://fonts1.unidays.world/unidays/v1/all-book.woff2'),
            cache.add('https://fonts1.unidays.world/unidays/v1/all-demi.woff2'),
            cache.add('https://fonts1.unidays.world/unidays/v1/all-heavy.woff2')
		]);
	})
}

self.addEventListener('install', function(event) {
	self.skipWaiting && self.skipWaiting();

	event.waitUntil(refresh());
});

self.addEventListener('activate', function(event) {
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
	
	var result = fetch(event.request).catch(function(error) {
		return caches.match(event.request);
	});
	
	event.respondWith(result);
});

self.addEventListener('message', function(msg){
	
	if(msg && msg.data.type === 'refresh')
		refresh();

});
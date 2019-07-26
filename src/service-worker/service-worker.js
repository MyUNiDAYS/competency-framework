
function refresh(){
	return caches.open(cacheName).then(function(cache){
		return Promise.all(cacheList.map(i => cache.add(i)));
	});
}

self.addEventListener('install', function(event) {
	self.skipWaiting && self.skipWaiting();

	event.waitUntil(Promise.all([
		refresh(),
		Promise.all(caches.keys().then(cacheNames => cacheNames.filter(name => name != cacheName).map(name => caches.delete(name))))
	]));
});

self.addEventListener('activate', function(event) {
	return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	event.respondWith(async function() {
		try {
			return await fetch(event.request);
		} catch (err) {
			if(event.request.mode === 'navigate')
				return caches.match('/');
			return caches.match(event.request);
		}
	}());
});

self.addEventListener('message', function(msg){
	
	if(msg && msg.data.type === 'refresh')
		refresh();

});
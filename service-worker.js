
function refresh(){
	return caches.open('offline-v2').then(function(cache){
		return Promise.all([
			cache.add('/'),
            cache.add('/js/core-competencies.js'),
            cache.add('/js/engineering-competencies.js'),
            cache.add('/css/styles.css'),
            cache.add('/js/handlebars-v4.1.2.js'),
			cache.add('/js/index.js'),
			cache.add('/logo.png'),
            cache.add('/favicon.ico'),
            cache.add('/favicon-16x16.png'),
            cache.add('/favicon-32x32.png'),
            cache.add('https://fonts1.unidays.world/unidays/v1/all-book.woff2'),
            cache.add('https://fonts1.unidays.world/unidays/v1/all-demi.woff2'),
			cache.add('https://fonts1.unidays.world/unidays/v1/all-heavy.woff2'),
			cache.add('https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css')
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
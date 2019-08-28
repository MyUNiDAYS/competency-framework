// Register service worker for offline operation
if (('serviceWorker' in navigator) && false)
{
    navigator.serviceWorker.register('/service-worker.js');

    navigator.serviceWorker.ready.then(function (registration) {
        registration.active.postMessage({
            type: 'refresh'
        });
    }); 
}

var pageCache = {
    store: {},
    get: function(key) { return Promise.resolve(this.store[key]); },
    set: function(key, value) { this.store[key] = value; }
}

var $content;

function updateUi(path, hash){

    document.querySelectorAll('.active').forEach(a => a.classList.remove('active'));

    // highlight current hash
    if(hash)
        document.querySelectorAll(`#${hash}`).forEach(s => s.classList.add('active'));

    // highlight links
    if(hash)
        document.querySelectorAll(`a[href="${path}#${hash}"]`).forEach(a => a.classList.add('active'));
    else
        document.querySelectorAll(`a[href="${path}"]`).forEach(a => a.classList.add('active'));

}

// Handle navigation to show content
function handleNavigation(){
    document.body.scrollTo({ y: 0 });

    var path = window.location.pathname;
    var hash = window.location.hash ? window.location.hash.substr(1) : '';
    
    getPage(path).then($html => {
        // remove old content
        while ($content.firstChild)
            $content.removeChild($content.firstChild);
        
        // add new content
        $content.appendChild($html);

        // update UI
        updateUi(path, hash);
    });
}

// Gets a page from the in memory cache or the network
// Returns a promise resolving a DOM tree
function getPage(path){
    return pageCache
            .get(path)
            .then($html => {
                if($html)
                    return $html;
                
                return loadPage(path).then($html => {
                    pageCache.set(path, $html);
                    return $html;
                });
            });
}


// Loads a given page from the network.
// Returns a promise resolving a DOM tree
function loadPage(path){
    return fetchPath(path).then(parseHtml)
}

// Fetches the HTML for a given path
// Returns a promise resolving an HTML string
function fetchPath(path){
    var url = '/' + path.replace(/[^a-z0-9\-_]/gi, '_') + '.html';
    return fetch(url).then(response => response.text());
}

// Parses an HTML string into a DOM tree
function parseHtml(html){
    var parser = new DOMParser()
    var dom = parser.parseFromString(html, 'text/html');

    // Replace scripts with new scripts, because https://stackoverflow.com/questions/28112807/why-script-elements-created-through-domparser-do-not-execute
    var $fragment = document.createDocumentFragment();
    var childNodes = dom.body.childNodes;

    while (childNodes.length)
        $fragment.appendChild(childNodes[0]);

    [...$fragment.querySelectorAll('script')].forEach(script => {
        var newScript = document.createElement('script');
        newScript.innerHTML = script.innerHTML;
        script.parentElement.replaceChild(newScript, script);
    });

    return $fragment;
}

// Entry point to cause a page navigation
function navigate(url){
    history.pushState(null, null, url);
    handleNavigation();
}

window.addEventListener('load', function(){

    $content = document.getElementById('content');

    // Highjack all internal link clicks and use pushtate instead
    document.addEventListener('click', function(e){
        if(e.target.nodeName !== 'A')
            return;

        var href = e.target.attributes.href.nodeValue;

        if(!/^\//.test(href))
            return;
        
        e.preventDefault();

        if(href !== window.location.pathname){
            navigate(href);
        }
    });

    document.querySelector('body > nav').addEventListener('click', function(e) {
        if(!e.target.matches('a'))
            return;
        var $nav = this;
        $nav.classList.add('force-collapse');
        window.setTimeout(function() {
            $nav.classList.remove('force-collapse');
        }, 150);
    })

    document.addEventListener('click', e => {
        if(!e.target.matches('.accordion section h4'))
            return;

        var $section = e.target.closest('section')

        if($section.classList.contains('open'))
            $section.classList.remove('open');
        else
            $section.classList.add('open');
    });

    // boot the page    
    handleNavigation();
});

// Handle pushstate navigation
window.addEventListener('popstate', function(e){
    handleNavigation();
});
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




// Handle pushstate navigation
window.addEventListener('popstate', function(e){
    handleNavigation();
});

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

    // TODO: merge all the below code into one mechanism

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
    
    pageCache.get(path)
        .then(html => {
            if(html)
                return html;

            var url = '/' + path.replace(/[^a-z0-9\-_]/gi, '_') + '.html';
            return fetch(url)
                .then(response => response.text())
                .then(html => {
                    var parser = new DOMParser()
                    var dom = parser.parseFromString(html, 'text/html');
                    var $elem = dom.body.firstElementChild;
                    pageCache.set(path, $elem);
                    return $elem;
                })
            
        })
        .then($html => {
            $content.removeChild($content.firstElementChild);
            $content.appendChild($html);
            updateUi(path, hash);
        });
}

window.addEventListener('load', function(){

    $content = document.getElementById('content');

    // Highjack all internal link clicks and use pushtate instead
    document.addEventListener('click', function(e){
        debugger;
        if(e.target.nodeName !== 'A')
            return;

        var href = e.target.attributes.href.nodeValue;

        if(!/^\//.test(href))
            return;
        
        e.preventDefault();

        if(href !== window.location.pathname){
            history.pushState(null, null, href);
            handleNavigation();
        }
    });

    this.document.querySelector('body > nav').addEventListener('click', function(e){
        if(e.target.nodeName !== 'A')
            return;

        this.classList.add('force-collapse');
        window.setTimeout(function() {
            this.classList.remove('force-collapse');
        }, 150);
    })

    // style textareas
    document.addEventListener('change', function(e){
        if(e.target.nodeName !== 'textarea')
            return;

        if(e.target.value === '')
            e.target.classList.remove('populated');
        else
            e.target.classList.add('populated');
    });


    document.querySelectorAll('.accordion section').forEach($section => {
        $section.addEventListener('click', e => {
            if(e.target.nodeName !== 'H4')
                return;
            
            if($section.classList.contains('open'))
                $section.classList.remove('open');
            else
                $section.classList.add('open');
        });
    });

    // boot the page    
    handleNavigation();

});
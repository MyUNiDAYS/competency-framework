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


function serializeReview(){

    var $review = document.querySelector('.role-level-review');
    var $answers = $review.querySelectorAll('input:checked');
    var values = [...$answers].map($input => { return { 
        name: $input.name, 
        value: parseInt($input.value, 10),
        $tr: $input.closest('tr')
    }});

    var numericalValues = values.map(v => v.value);
    var mean = average(numericalValues);
    var stdev = standardDeviation(numericalValues);

    // get lowest 10th percentile
    var targets = values
        .filter(v => (v.value - mean) / stdev > -1.282)

    return values;

}

function mapReviewResults(results){

    results.forEach(result => {
        result.$tr.parentElement.removeChild(result.$tr);
    });
}

function standardDeviation(values){
    var avg = average(values);

    var squareDiffs = values.map(function(value){
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
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
    var $elem = dom.body.firstElementChild;
    return $elem;
}

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

    this.document.addEventListener('submit', e => {
        if(!e.target.matches('.review'))
            return;
        
        var $form = e.target;
        var action = $form.action;

        var $inputs = $form.querySelectorAll('input:checked');
        var queryString = [...$inputs].map($input => { return { 
            name: $input.name, 
            value: parseInt($input.value, 10)
        }}).reduce((acc, curr) => acc + encodeURIComponent(curr.name) + '=' + encodeURIComponent(curr.value), '?');
        
        navigate(action + queryString);
    })

    // boot the page    
    handleNavigation();
});

// Handle pushstate navigation
window.addEventListener('popstate', function(e){
    handleNavigation();
});
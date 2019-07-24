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

// Handle navigation to show content
function handleNavigation(){
    document.body.scrollTo({ y: 0 });

    var path = window.location.pathname;
    var hash = window.location.hash ? window.location.hash.substr(1) : '';
    
    // Show content
    document.querySelectorAll('[data-path]').forEach(section => section.style.display = 'none');
    document.querySelectorAll(`[data-path="${path}"]`).forEach(s => s.style.display = 'block');
    
    // highlight current hash
    document.querySelectorAll(`[id]`).forEach(s => s.classList.remove('active'));
    if(hash)
        document.querySelectorAll(`#${hash}`).forEach(s => s.classList.add('active'));

    // TODO: merge all the below code into one mechanism

    // highlight links
    document.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
    if(hash)
        document.querySelectorAll(`a[href="${path}#${hash}"]`).forEach(a => a.classList.add('active'));
    else
        document.querySelectorAll(`a[href="${path}"]`).forEach(a => a.classList.add('active'));
        
    //let pathSegment = path
    //while(pathSegment !== ''){
    //    document.querySelectorAll(`a[href="${pathSegment}"]`).forEach(a => a.classList.add('active'));
    //    pathSegment = pathSegment.substr(0, pathSegment.lastIndexOf('/'));
    //}

    // highlight nav heirarchy
    document.querySelectorAll('nav ul.active, nav li.active').forEach(a => a.classList.remove('active'));
    var currentElem = document.querySelector(`nav a[href="${path}"]`);
    do
    {
        if(!currentElem)
            break;

        currentElem.classList.add('active');
        currentElem = currentElem.parentElement;
    } while(currentElem.nodeName === 'LI' || currentElem.nodeName === 'UL');

    // highlight highlightables
    document.querySelectorAll('[data-highlight]').forEach(a => a.classList.remove('active'));
    document.querySelectorAll(`[data-highlight="${path}"]`).forEach(a => a.classList.add('active'));

    
    document.querySelectorAll('textarea').forEach(t => {
        t.addEventListener('change', e => {
            if(this.value === '')
                e.target.classList.remove('populated');
            else
                e.target.classList.add('populated');
        })
    });
}

window.addEventListener('load', function(){

    // Highjack all internal link clicks and use pushtate instead
    document.addEventListener('click', function(e){
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
    })

    // let menuToggles = document.querySelectorAll('.js-toggle');
    // console.log(menuToggles);

    // for (i = 1; i <= menuToggles.length; i++) {
    //     console.log(menuToggles[i]);

    //     menuToggles[i].addEventListener('click', function(e) {
    //         e.preventDefault();
    //         console.log('clicked');
    //         document.querySelector('body').classList.toggle("has-menu");
    //     });
    // }

    // boot the page    
    handleNavigation();

});
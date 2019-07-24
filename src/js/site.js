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
    var $pathElems = document.querySelectorAll('[data-path]');
    $pathElems.forEach(section => section.style.display = 'none');
    Array.prototype.slice.call($pathElems).filter(e => e.dataset.path == path).forEach(s => s.style.display = 'block');
    
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
        
    // highlight nav heirarchy
    var currentElem = document.querySelector(`nav a[href="${path}"]`);
    do
    {
        if(!currentElem)
            break;

        currentElem.classList.add('active');
        currentElem = currentElem.parentElement;
    } while(currentElem.nodeName === 'LI' || currentElem.nodeName === 'UL');

}

window.addEventListener('load', function(){

    let burger = document.querySelector('.burger');
    let menu = document.querySelector('.navigation');
    let listTrigger = document.querySelectorAll('.js-list-trigger');

    // Highjack all internal link clicks and use pushtate instead
    document.addEventListener('click', function(e){
        if(e.target == burger && !e.target.parentNode.classList.contains('js-menu-open')) {
            menu.classList.add('js-menu-open');
        } else if (e.target == burger && e.target.parentNode.classList.contains('js-menu-open')) {
            menu.classList.remove('js-menu-open');
        }

        // todo: check viewport is desktop
        listTrigger.forEach(function(element) {
            if(e.target == element) {
                element.nextElementSibling.classList.toggle('active');
            }
        });

        if(e.target.nodeName !== 'A')
            return;

        var href = e.target.attributes.href.nodeValue;

        if(!/^\//.test(href))
            return;
        
        e.preventDefault();

        if(href !== window.location.pathname){
            history.pushState(null, null, href);

            if (menu.classList.contains('js-menu-open')) {
                menu.classList.remove('js-menu-open');
            }

            handleNavigation();
        }
    });

    // style textareas
    document.addEventListener('change', function(e){
        if(e.target.nodeName !== 'textarea')
            return;

        if(e.target.value === '')
            e.target.classList.remove('populated');
        else
            e.target.classList.add('populated');
    });

    // boot the page    
    handleNavigation();

});
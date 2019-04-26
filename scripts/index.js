window.addEventListener('load', function(){

    // prepare content
    var levels = [...new Set([].concat(...window.competencies.map(comp => [].concat(...comp.topics.map(topic => topic.levels.map(level => level.level))))))];
    

    // compile all templates
    var templates = {};
    document.querySelectorAll('script[type="text/x-handlebars-template"]').forEach(template => {
        templates[template.id] = Handlebars.compile(template.innerHTML);
    });

    // Initialise content
    document.querySelector('body > nav').innerHTML = templates.nav(window.competencies[0])
    document.querySelector('#content').innerHTML = templates.content(window.competencies[0])

    // Handle pushstate navigation
    window.addEventListener('popstate', function(e){
        handleNavigation();
    });

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

    // Handle navigation to show content
    function handleNavigation(){
        var path = window.location.pathname;
        
        // Hide all content
        document.querySelectorAll('section[data-path]').forEach(section =>{
            section.style.display = 'none';
        });
        
        // Show this content
        var segments = path === '/' ? ['root'] : path.substr(1).split('/');
        for(var i = 0; i < segments.length; i++)
            document.querySelector(`section[data-path=${segments[i]}]`).style.display = 'block';
    }
    
    // boot the page    
    handleNavigation();

});
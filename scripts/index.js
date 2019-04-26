window.addEventListener('load', function(){

    // prepare content
    var levels = [...new Set([].concat(...window.competencies.map(comp => [].concat(...comp.topics.map(topic => topic.levels.map(level => level.level))))))];
    
    // explode role mappings into object references
    window.roles.forEach(role => {
        for(var i = 0; i < role.competencies.length; i++){
            var map = role.competencies[i];

            var path = map.split('/');
            var competency = window.competencies.filter(c => c.path === path[0])[0];
            var topic = competency.topics.filter(t => t.path === path[1])[0];
            var level = topic.levels.filter(l => l.level === path[2])[0];

            role.competencies[i] = {
                competency: competency,
                topic: topic,
                level: level
            };
        }
    });


    // compile all templates
    var templates = {};
    document.querySelectorAll('script[type="text/x-handlebars-template"]').forEach(template => {
        templates[template.id.substr(5)] = Handlebars.compile(template.innerHTML);
    });

    // Initialise content
    document.querySelector('body > nav').innerHTML = templates['nav-competencies'](window.competencies[0]) + templates['nav-roles'](window.roles);
    document.querySelector('#content').innerHTML = templates['competencies'](window.competencies[0]) + templates['roles'](window.roles)

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
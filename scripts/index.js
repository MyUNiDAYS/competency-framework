function explodeCompetencies(node){
    for(var d = 0; d < (node.departments ? node.departments.length : 0); d++)
        explodeCompetencies(node.departments[d]);
    
    for(var r = 0; r < (node.roles ? node.roles.length : 0); r++)
    {
        var role = node.roles[r];
        for(var i = 0; i < role.competencies.length; i++){
            var map = role.competencies[i];

            var path = map.split('/');
            var competency = window.competencies.filter(c => c.path === path[0])[0];
            var topic = competency.topics.filter(t => t.path === path[1])[0];
            var level = topic.levels.filter(l => l.path === path[2])[0];

            role.competencies[i] = {
                competency: competency,
                topic: topic,
                level: level
            };
        }
    }
}

// explode role mappings into object references
window.roles.forEach(role => {
    explodeCompetencies(role);
});

window.addEventListener('load', function(){

    // compile all templates and partials
    var templates = {};
    document.querySelectorAll('script[type="text/x-handlebars-template"]').forEach(template => {
        let compiled = Handlebars.compile(template.innerHTML);
        if(template.className === "partial")
            Handlebars.registerPartial(template.id.substr(5), compiled);
        else 
            templates[template.id.substr(5)] = compiled;
    });

    // Initialise content
    document.querySelector('.container > nav').innerHTML += templates['nav-competencies'](window.competencies) + templates['nav-roles'](window.roles);
    document.querySelector('#content').innerHTML += templates['competencies'](window.competencies) + templates['roles'](window.roles)

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
            document.querySelector(`section[data-path="${segments[i]}"]`).style.display = 'block';
    }
    
    // boot the page    
    handleNavigation();

});
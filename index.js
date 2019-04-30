function explodeCompetencies(node){
    for(var d = 0; d < (node.departments ? node.departments.length : 0); d++)
        explodeCompetencies(node.departments[d]);
    
    for(var r = 0; r < (node.roles ? node.roles.length : 0); r++)
    {
        var role = node.roles[r];

        role.allRequiredTopics = [];
        role.allOptionalTopics = [];

        // replace string addresses with actual references
        for(var l = 0; l < role.levels.length; l++) {
            for(var i = 0; i < role.levels[l].competencies.required.length; i++)
            {
                role.levels[l].competencies.required[i] = referenceCompetencies(role.levels[l].competencies.required[i]);

                if(role.allRequiredTopics.filter(c => c.topic === role.levels[l].competencies.required[i].topic).length === 0)
                    role.allRequiredTopics.push(role.levels[l].competencies.required[i]);
            }

            for(var i = 0; i < (role.levels[l].competencies.optional ? role.levels[l].competencies.optional.length : 0); i++)
            {
                role.levels[l].competencies.optional[i] = referenceCompetencies(role.levels[l].competencies.optional[i]);

                if(role.allOptionalTopics.filter(c => c.topic === role.levels[l].competencies.optional[i].topic).length === 0)
                    role.allOptionalTopics.push(role.levels[l].competencies.optional[i]);
            }
        }
    }
}

function referenceCompetencies(map){
    var path = map.split('/');
    var competency = window.competencies.filter(c => c.path === path[0])[0];
    var topic = competency.topics.filter(t => t.path === path[1])[0];
    var level = topic.levels.filter(l => l.path === path[2])[0];

    return {
        competency: competency,
        topic: topic,
        level: level
    };
}

// explode role mappings into object references
window.roles.forEach(role => {
    explodeCompetencies(role);
});

// Register service worker for offline operation
if (('serviceWorker' in navigator))
{
    navigator.serviceWorker.register('/service-worker.js');

    navigator.serviceWorker.ready.then(function (registration) {
        registration.active.postMessage({
            type: 'refresh'
        });
    }); 
}

window.addEventListener('load', function(){

    // compile all templates and partials
    var templates = {};
    document.querySelectorAll('script[type="text/x-handlebars-template"]').forEach(template => {
        let compiled = Handlebars.compile(template.innerHTML);
        if(template.className === "partial")
            Handlebars.registerPartial(template.id.substr(5), compiled);
        else 
            templates[template.id.substr(5)] = compiled;
        template.parentElement.removeChild(template);
    });

    Handlebars.registerHelper('getRoleTopicLevel', function (role, topic) {
        var competencies = role.competencies.required.filter(c => c.topic === topic.topic);
        if(competencies.length == 0)
            return "N/A";

        return competencies[0].level.title;
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
        document.querySelectorAll('[data-path]').forEach(section =>{
            section.style.display = 'none';
        });
        
        // Show content
        var segments = path === '/' ? ['root'] : path.substr(1).split('/');
        for(var i = 0; i < segments.length; i++)
            document.querySelectorAll(`[data-path="${segments[i]}"]`).forEach(s => s.style.display = 'block');

        // highlight links
        document.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
        let pathSegment = path
        while(pathSegment !== ''){
            document.querySelectorAll(`a[href="${pathSegment}"]`).forEach(a => a.classList.add('active'));
            pathSegment = pathSegment.substr(0, pathSegment.lastIndexOf('/'));
        }

        // highlight nav heirarchy
        document.querySelectorAll('nav ul.active, nav li.active').forEach(a => a.classList.remove('active'));
        var currentElem = document.querySelector(`nav a[href="${path}"]`);
        do
        {
            currentElem.classList.add('active');
            currentElem = currentElem.parentElement;
        } while(currentElem.nodeName === 'LI' || currentElem.nodeName === 'UL');
    }
    
    // boot the page    
    handleNavigation();

});
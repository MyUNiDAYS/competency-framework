function explodeCompetencies(node){
    for(var d = 0; d < (node.departments ? node.departments.length : 0); d++)
        explodeCompetencies(node.departments[d]);
    
    for(var r = 0; r < (node.roles ? node.roles.length : 0); r++)
    {
        var role = node.roles[r];

        role.allCompetencies = [];

        // replace string addresses with actual references
        for(var l = 0; l < role.levels.length; l++) {
            for(var i = 0; i < role.levels[l].competencies.required.length; i++)
            {
                role.levels[l].competencies.required[i] = referenceCompetencies(role.levels[l].competencies.required[i]);

                var requiredCompetency;
                if((requiredCompetency = role.allCompetencies.filter(c => c.competency == role.levels[l].competencies.required[i].competency)).length === 1)
                    requiredCompetency = requiredCompetency[0];
                else
                    role.allCompetencies.push(requiredCompetency = { 
                        competency: role.levels[l].competencies.required[i].competency, 
                        topics: [],
                        type: 'Required'
                    });

                if(requiredCompetency.topics.filter(t => t === role.levels[l].competencies.required[i].topic).length === 0)
                    requiredCompetency.topics.push(role.levels[l].competencies.required[i].topic);
            }

            if(!role.levels[l].competencies.optional)
                role.levels[l].competencies.optional = [];

            for(var i = 0; i < role.levels[l].competencies.optional.length; i++)
            {
                role.levels[l].competencies.optional[i] = referenceCompetencies(role.levels[l].competencies.optional[i]);

                var optionalCompetency;
                if((optionalCompetency = role.allCompetencies.filter(c => c.competency == role.levels[l].competencies.optional[i].competency)).length === 1)
                    optionalCompetency = optionalCompetency[0];
                else
                    role.allCompetencies.push(optionalCompetency = { 
                        competency: role.levels[l].competencies.optional[i].competency, 
                        topics: [],
                        type: 'Optional'
                    });

                if(optionalCompetency.topics.filter(t => t === role.levels[l].competencies.optional[i].topic).length === 0)
                    optionalCompetency.topics.push(role.levels[l].competencies.optional[i].topic);
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

window.addEventListener('load', function(){

    // explode role mappings into object references
    window.roles.forEach(role => {
        explodeCompetencies(role);
    });

    Handlebars.registerHelper('getRoleTopicLevel', function (role, topic) {
        var competencies = role.competencies.required.filter(c => c.topic === topic);
        
        if(competencies.length == 0)
            competencies = role.competencies.optional.filter(c => c.topic === topic);

        if(competencies.length == 0)
            return "N/A";

        return competencies[0].level.title;
    });

    Handlebars.registerHelper('ifLevelEqual', function (topic, level, expectedLevel, options) {
        var expectedIndex = topic.levels.indexOf(expectedLevel);
        var index = topic.levels.indexOf(level);

        if(expectedIndex === -1 || index === -1)
            return;

        if(index === expectedIndex)
            return options.fn(this);
        
        return;
    });

    Handlebars.registerHelper('ifLevelLowerOrEqual', function (topic, level, expectedLevel, options) {
        var expectedIndex = topic.levels.indexOf(expectedLevel);
        var index = topic.levels.indexOf(level);

        if(expectedIndex === -1 || index === -1)
            return;

        if(index <= expectedIndex)
            return options.fn(this);
        
        return;
    });

    Handlebars.registerHelper('levelRequirementClass', function (topic, level, expectedLevel) {
        var expectedIndex = topic.levels.indexOf(expectedLevel);
        var index = topic.levels.indexOf(level);

        if(expectedIndex === -1 || index === -1)
            return '';

        if(index < expectedIndex)
            return 'level-lower'
        if(index == expectedIndex)
            return 'level-equal';
        return 'level-above'
    });

    // Initialise content
    document.querySelector('body > nav > ul').innerHTML += templates['nav-competencies'](window.competencies) + templates['nav-roles'](window.roles);
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
        document.body.scrollTo({ y: 0 });

        var path = window.location.pathname;
        var hash = window.location.hash ? window.location.hash.substr(1) : '';
        
        // Show content
        document.querySelectorAll('[data-path], [data-hash]').forEach(section => section.style.display = 'none');
        document.querySelectorAll(`[data-path="${path}"]`).forEach(s => s.style.display = 'block');
        document.querySelectorAll(`[data-hash="${hash}"]`).forEach(s => s.style.display = 'block');

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


  
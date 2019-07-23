'use strict';
module.exports = function (grunt) {
    
    const sass = require('node-sass');

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'build/site.css': 'src/scss/styles.scss'
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/site.js.map'
                },
                files: {
                    'build/site.js': ['src/js/*.js']
                }
            }
        },
        watch: {
            options: {
                livereload: true,
              },
            scripts: {
                files: ['src/**/*', 'content/**/*.js'],
                tasks: ['default'],
            },
          },
      });
      
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-uglify-es');

      grunt.registerTask('generate', function(){
        
        // load all roles
        var roles = grunt.file.expand({ filter: 'isFile', cwd: 'content/roles'}, ['*.js']).map(f => require('./content/roles/' + f));
        // load all competencies
        var competencies = grunt.file.expand({ filter: 'isFile', cwd: 'content/competencies'}, ['*.js']).map(f => require('./content/competencies/' + f));

        // explode role mappings into object references
        roles.forEach(role => {
            explodeCompetencies(competencies, role);
        });
        
        const handlebars = require('handlebars');

        handlebars.registerHelper('getRoleTopicLevel', function (role, topic) {
            var competencies = role.competencies.required.filter(c => c.topic === topic);
            
            if(competencies.length == 0)
                competencies = role.competencies.optional.filter(c => c.topic === topic);

            if(competencies.length == 0)
                return "N/A";

            return competencies[0].level.title;
        });

        // load all handlebars helpers
        grunt.file.expand({ filter: 'isFile', cwd: 'src/handlebars' }, ['helper_*.js']).forEach(f => handlebars.registerHelper(f.substr(7, f.length - 10), require('./src/handlebars/' + f)));

        var templates = loadHandlebars(grunt, 'src/handlebars', 'template_*.hbs', f => f.substr(9, f.length - 13));

        var partials = loadHandlebars(grunt, 'src/handlebars', 'partial_*.hbs', f => f.substr(8, f.length - 12));

        for(var p in partials)
            handlebars.registerPartial(p, partials[p]);
        
        console.log(templates);

        var generated = templates['site']({
            roles: roles,
            competencies: competencies
        });
        grunt.file.write('./build/index.html', generated);

      });

      grunt.registerTask('default', ['sass', 'generate', 'uglify']);


      
};

function loadHandlebars(grunt, path, filter, nameMap){
    var handlebars = require('handlebars');
    var files = grunt.file.expand({ filter: 'isFile', cwd: path }, [filter]);

    return files
        .map(f => {
            return { 
                name: nameMap(f), 
                template: handlebars.compile(grunt.file.read(path + '/' + f))
            }
        })
        .reduce((map, obj) => {
            map[obj.name] = obj.template;
            return map;
        }, {});
}


function explodeCompetencies(competencies, node){

    for(var d = 0; d < (node.departments ? node.departments.length : 0); d++)
        explodeCompetencies(competencies, node.departments[d]);
    
    for(var r = 0; r < (node.roles ? node.roles.length : 0); r++)
    {
        var role = node.roles[r];

        role.allCompetencies = [];

        // replace string addresses with actual references
        for(var l = 0; l < role.levels.length; l++) {
            for(var i = 0; i < role.levels[l].competencies.required.length; i++)
            {
                role.levels[l].competencies.required[i] = referenceCompetencies(competencies, role.levels[l].competencies.required[i]);

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
                role.levels[l].competencies.optional[i] = referenceCompetencies(competencies, role.levels[l].competencies.optional[i]);

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
};


function referenceCompetencies(competencies, map){
    var path = map.split('/');
    var competency = competencies.filter(c => c.path === path[0])[0];
    var topic = competency.topics.filter(t => t.path === path[1])[0];
    var level = topic.levels.filter(l => l.path === path[2])[0];

    return {
        competency: competency,
        topic: topic,
        level: level
    };
};
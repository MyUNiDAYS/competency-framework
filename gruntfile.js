'use strict';
module.exports = function (grunt) {
    
    const handlebars = require('handlebars');
    const md5 = require('md5');
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;

    grunt.initConfig({
        clean: ['build'],
        sass: {
            dev: {
                options: {
                    implementation: require('node-sass'),
                    sourceMap: true,
                    outputStyle: 'compressed'
                },
                files: {
                    'build/site.css': ['src/scss/styles.scss']
                }
            },
            prod: {
                options: {
                    implementation: require('node-sass'),
                    sourceMap: false,
                    outputStyle: 'compressed'
                },
                files: {
                    'build/site.css': ['src/scss/styles.scss']
                }
            }
        },
        copy: {
            dev: {
                files: [
                    //{ expand: true, cwd: 'src/js', src: ['*'], dest: 'build/' },
                    { expand: true, cwd: 'src/assets', src: ['*'], dest: 'build/' },
                    { expand: true, cwd: 'src', src: ['service-worker.js'], dest: 'build/' },
                    { expand: true, cwd: 'src', src: ['web.config'], dest: 'build/' }
                ]
            },
            prod: {
                files: [
                    { expand: true, cwd: 'src/assets', src: ['*'], dest: 'build/' }
                ]
            }
        },
        uglify: {
            jsDev: {
                options: {
                    sourceMap: true,
                    compress: {
                        drop_debugger: false
                    }
                },
                files: {
                    'build/site.js': ['src/js/*.js']
                }
            },
            swDev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'build/service-worker.js': ['obj/cache-list.js', 'src/service-worker/service-worker.js']
                }
            },
            jsProd: {
                files: {
                    'build/site.js': ['src/js/*.js']
                }
            },
            swProd: {
                files: {
                    'build/service-worker.js': ['obj/cache-list.js', 'src/service-worker/service-worker.js']
                }
            }
        },
        express: {
           custom: {
                options: {
                    server: 'server.js'
                }
           }
        },
        watch: {
            scss: {
                files: ['src/scss/*'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify:jsDev']
            },
            serviceWorker: {
                files: ['src/service-worker/*'],
                tasks: ['buildServiceWorkerUrls', 'uglify:swDev']
            },
            assets: {
                files: ['src/assets/*', 'src/web.config'],
                tasks: ['copy:dev']
            },
            content: {
                files: ['content/**/*', 'src/helpers/*', 'src/partials/*', 'src/templates/*'],
                tasks: ['generate']
            }
          },
          concurrent: {
            options: {
                logConcurrentOutput: true
              },
              dev: {
                tasks: ['server', 'watch:scss', 'watch:js', 'watch:serviceWorker', 'watch:assets', 'watch:assets', 'watch:content']
              }
          }
      });
      
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-uglify-es');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-concurrent');
      grunt.loadNpmTasks('grunt-express');
      
      grunt.registerTask('server', ['express', 'express-keepalive']);

      grunt.registerTask('dev', ['concurrent:dev']);

      grunt.registerTask('build:dev', ['clean', 'sass:dev', 'generate', 'uglify:jsDev', 'copy:dev', 'buildServiceWorkerUrls', 'uglify:swDev']);
      grunt.registerTask('build:prod', ['clean', 'sass:prod', 'generate', 'uglify:jsProd', 'copy:prod', 'buildServiceWorkerUrls', 'uglify:swProd']);

      grunt.registerTask('default', ['build:prod']);

      grunt.registerTask('generate', function(){
        
        var content = loadContent()
        

        // load all handlebars helpers
        grunt.file.expand({ filter: 'isFile', cwd: 'src/helpers' }, ['*.js']).forEach(f => handlebars.registerHelper(f.substr(0, f.length - 3), require('./src/helpers/' + f)));
        // load all handlebars templates
        var templates = loadHandlebars('src/templates', '*.hbs', f => f.substr(0, f.length - 4));
        // load all handlebars partials
        var partials = loadHandlebars('src/partials', '*.hbs', f => f.substr(0, f.length - 4));
        for(var p in partials)
            handlebars.registerPartial(p, partials[p]);
        

        for(var template in templates) {
            var generated = templates[template](content);
            
            const dom = new JSDOM(generated);
            var pages = dom.window.document.querySelectorAll('section[data-path]');

            pages.forEach(page => {

                // dataset doesnt work for some reason
                var filename = page.attributes['data-path'].value;
                filename = filename.replace(/[^a-z0-9\-_]/gi, '_');

                // tidy up
                page.removeAttribute('data-path');
                page.parentNode.removeChild(page);

                grunt.file.write('./build/' + filename + '.html', page.outerHTML);
            });

            grunt.file.write('./build/' + template + '.html', dom.window.document.documentElement.outerHTML);
        }

    });

    grunt.registerTask('buildServiceWorkerUrls', function(){

        var files = grunt.file.expand({ expand: true, cwd: 'build' }, ['*.*']);
        files = files.map(f => '/' + f);

        var filesJson = JSON.stringify(files);
        var cacheName = md5(filesJson);
        grunt.file.write('obj/cache-list.js', 'var cacheList = ' + filesJson + ';\nvar cacheName = \'' + cacheName + '\'');

        //cache.add('https://fonts1.unidays.world/unidays/v1/all-book.woff2'),
        //cache.add('https://fonts1.unidays.world/unidays/v1/all-demi.woff2'),
        //cache.add('https://fonts1.unidays.world/unidays/v1/all-heavy.woff2')
    });


        
    function loadContent() {

        // load all roles
        var roles = grunt.file.expand({ filter: 'isFile', cwd: 'content/roles'}, ['*.json']).map(f => require('./content/roles/' + f));
        // load all competencies
        var competencies = grunt.file.expand({ filter: 'isFile', cwd: 'content/competencies'}, ['*.json']).map(f => require('./content/competencies/' + f));

        // explode role mappings into object references
        roles.forEach(role => {
            explodeCompetencies(competencies, role);
        });

        return {
            roles: roles,
            competencies: competencies
        };
    }

    function loadHandlebars(path, filter, nameMap){
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
            for(var l = 0; l < role.levels.length; l++)
            {
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
};
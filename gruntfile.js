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
                    'site.css': 'scss/styles.scss'
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'templates',
                    processName: function(filePath) {
                        var fileName = filePath.substr(filePath.indexOf('/') + 1);
                        return fileName.substr(0, fileName.length - 4);
                    },
                    processPartialName: function(filePath) {
                        var fileName = filePath.substr(filePath.indexOf('/') + 9);
                        return fileName.substr(0, fileName.length - 4);
                    },
                    partialRegex: /^partial_/
                },
                files: {
                    'templates.js': ['templates/*.hbs']
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'index.js.map'
                },
                files: {
                    'site.js': ['js/*.js', 'templates.js']
                }
            }
        },
        watch: {
            options: {
                livereload: true,
              },
            scripts: {
                files: ['scss/*.scss', 'templates/*.hbs', 'js/*.js'],
                tasks: ['default'],
            },
          },
      });
      
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-handlebars');
      grunt.loadNpmTasks('grunt-contrib-uglify-es');

      grunt.registerTask('default', ['sass', 'handlebars', 'uglify']);

};
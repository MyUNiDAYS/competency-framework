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
                    'css/styles.css': 'scss/styles.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
              },
            scripts: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
            },
          },
      });
      
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');

      grunt.registerTask('default', ['sass']);

};
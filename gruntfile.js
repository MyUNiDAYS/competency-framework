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
        }
      });
      
      grunt.loadNpmTasks('grunt-sass');

      grunt.registerTask('default', ['sass']);

};
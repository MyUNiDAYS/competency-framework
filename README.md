# competency-framework

## Building

`grunt build:dev` will produce a development build, where the JS and CSS contain source maps to aid debugging.

`grunt build:prod` will produce a production build.

`grunt watch` will run `build:dev` whenever it notices any changes to any content or source files. Alternatively you can run `grunt build:dev` manually.

## Hosting

This project is designed to be hosted in production on Amazon S3. Below is the bucket configuration you need.

TODO

In develpoment, point a webserver at the `./build` folder.

All extensionless paths must be rewritten to `/`

## Content

All the content lives under `./content`. 

Competencies live under `./content/competencies` and Roles live under `./content/roles`

TODO: These JSON document require a schema

## Styling/CSS 

The CSS is produced by SASS compilation from sources described below.

The source for styles live under `./src/scss`.

`styles.scss` is the entry point, notice the `@imports` at the top.

If you want to add more/separate `.scss` files you need to import them from (probably) `stlyes.scss`

## Javascript

The JS is produced by Uglify-es compilation of the sources described below.

The source for Javascript lives under `./src/js`

All files in this path will be combined together, in file-system order (i.e. the order `ls` shows)

## Assets (images etc)

All assets live under './src/assets'

On build, everything in this folder gets copied to the `./build` output folder.

A `dev` build also copies a `web.config` which enables easy serving of the project under Windows IIS`

## HTML

The HTML is produced by combining the Roles and Cmpetencies JSON with Handlebars.js templates.

### Context

When the templates are compiled into HTML, a context object is passed (i.e. normal Handbelars.js operation). The context object looks like this:

```
{
  competencies: [], // all competency objects from `./content/competencies
  roles: [] // all role objects from `./content/roles`
}
```

When defining a Role, Competencies are referenced by path. Before being passed to Handlebars, these paths are replaced with in-memory references to the referenced competencies.

That means, you can traverse the object graph from a Role to the Competencies which make it up.


### Handlebars.js Templates

Currently, there is only one template called `index.hbs`.
This gets built into `index.html`, the only page which exists for this app.
This lives at `./src/tempaltes/index.hbs`

All the template files under `./src/tempaltes` will be automatically detected and registered as templates.

### Handlebars.js Partials

All Partials which can be called from Templates or other Partials live under `./src/partials`.

The name of the file (sans `.js`) is the name of the partial.

All the partial files under `./src/partials` will be automatically detected and registered as partials.

### Handlebars.js Helpers

Where in Handlebars.js you create a helper like this:

```
Handlebars.registerHelper('log', function(data) {
  console.log(data);
});
```

In this project, simply make a file called `log.js` under the `./src/helpers` folder, and return the function using `module.exports`

```
module.exports = function(data) {
  console.log(data);
}
```

All the helper files under `./src/helpers` will be automatically detected and registered as helpers.

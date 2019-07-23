this["templates"] = this["templates"] || {};

Handlebars.registerPartial("navroles", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navroles,depth0,{"name":"navroles","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li>\r\n            <a href=\"/roles/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n            <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.levels : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </li>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                <li><a href=\"/roles/"
    + alias1(container.lambda((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\r\n    <a href=\"/roles/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" class=\"nav-link\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.departments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</li>";
},"usePartial":true,"useData":true,"useDepths":true}));

Handlebars.registerPartial("rolesPartial", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.departments : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.rolesPartial,depth0,{"name":"rolesPartial","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roles : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <section class=\"role\" data-path=\"/roles/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n        <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n        <section class=\"box box-table\">\r\n            <h2>Summary</h2>\r\n            <p>"
    + alias4(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <h2>Level Overview</h2>\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <td></td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.allCompetencies : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </tr>\r\n                    <tr>\r\n                        <td></td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.allCompetencies : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </tr>\r\n                </thead>\r\n                <tbody>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.levels : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tbody>\r\n            </table>\r\n            <!--\r\n            <table>\r\n                <thead>\r\n                    <tr>\r\n                        <td colspan=\"2\"></td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.levels : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </tr>\r\n                </thead>\r\n                <tbody>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.allCompetencies : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tbody>\r\n            </table>-->\r\n        </section>\r\n    </section>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.levels : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <th colspan=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topics : depth0)) != null ? stack1.length : stack1), depth0))
    + "\"><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></th>\r\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                        <th><a href=\"/competencies/"
    + alias1(container.lambda(((stack1 = (depths[1] != null ? depths[1].competency : depths[1])) != null ? stack1.path : stack1), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></th>\r\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "                        <tr data-highlight=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n                            <th><a href=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></th>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depths[1] != null ? depths[1].allCompetencies : depths[1]),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        </tr>\r\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "                            <td>"
    + container.escapeExpression((helpers.getRoleTopicLevel || (depth0 && depth0.getRoleTopicLevel) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depths[2],depth0,{"name":"getRoleTopicLevel","hash":{},"data":data}))
    + "</td>\r\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                        <th><a href=\"/roles/"
    + alias1(container.lambda((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></th>\r\n";
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "                    <tr>\r\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.index),{"name":"unless","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        <td><a href=\"/competencies/"
    + alias2(container.lambda(((stack1 = (depths[1] != null ? depths[1].competency : depths[1])) != null ? stack1.path : stack1), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depths[2] != null ? depths[2].levels : depths[2]),{"name":"each","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </tr>\r\n";
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <th rowspan=\""
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].topics : depths[1])) != null ? stack1.length : stack1), depth0))
    + "\"><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].competency : depths[1])) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].competency : depths[1])) != null ? stack1.title : stack1), depth0))
    + "</a></th>\r\n";
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "                        <td>"
    + container.escapeExpression((helpers.getRoleTopicLevel || (depth0 && depth0.getRoleTopicLevel) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,depths[1],{"name":"getRoleTopicLevel","hash":{},"data":data}))
    + "</th>\r\n";
},"23":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "        <section class=\"role-level\" data-path=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n            <h1>"
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data}) : helper)))
    + " - <a href=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "\">"
    + alias2(alias1((depths[1] != null ? depths[1].title : depths[1]), depth0))
    + "</a></h1>\r\n            <div class=\"box\">\r\n                <h3>Actions - BETA</h3>\r\n                <div class=\"box-inner-container\">\r\n                    <a href=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "/review\" class=\"button\">Start Review</a>\r\n                </div>\r\n            </div>\r\n            <div class=\"box\">\r\n                <h3>Summary</h3>\r\n                <div class=\"box-inner-container\">\r\n                    <p>"
    + alias2(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <h3>Criteria</h3>\r\n            <div class=\"box-container\">\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.competencies : depth0)) != null ? stack1.required : stack1),{"name":"each","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.competencies : depth0)) != null ? stack1.optional : stack1),{"name":"each","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </section>\r\n        <section class=\"role-level-review\" data-path=\"/roles/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "/review\">\r\n            <h1>"
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data}) : helper)))
    + " - "
    + alias2(alias1((depths[1] != null ? depths[1].title : depths[1]), depth0))
    + "</h1>\r\n            <section class=\"tab-container box\">\r\n                <nav>\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.competencies : depth0)) != null ? stack1.required : stack1),{"name":"each","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </nav>\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.competencies : depth0)) != null ? stack1.required : stack1),{"name":"each","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.competencies : depth0)) != null ? stack1.optional : stack1),{"name":"each","hash":{},"fn":container.program(35, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </section>\r\n        </section>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <section class=\"role-competency box item\">\r\n                <h2><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a> - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.level : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                <h3><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></h3>\r\n                <div class=\"box-inner-container\">\r\n                    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.level : depth0)) != null ? stack1.criteria : stack1),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n            </section>\r\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "                        <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"27":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <a href=\"/roles/"
    + alias2(alias1((depths[2] != null ? depths[2].path : depths[2]), depth0))
    + "/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/review#"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\r\n";
},"29":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <section class=\"role-competency\" data-hash=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">\r\n                    <h2><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a> - <a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></h2>\r\n                    <p>Your expected level is "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.level : depth0)) != null ? stack1.title : stack1), depth0))
    + "</p>\r\n                    <table>\r\n                        <thead>\r\n                            <tr>\r\n                                <th colspan=\"2\" rowspan=\"2\">Criteria</th>\r\n                                <th colspan=\"2\">Strengths</th>\r\n                                <th colspan=\"2\">Weaknesss</th>\r\n                            </tr>\r\n                            <tr>\r\n                                <th>Justification</th>\r\n                                <th>Next Steps</th>\r\n                                <th>Justification</th>\r\n                                <th>Next Steps</th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.levels : stack1),{"name":"each","hash":{},"fn":container.program(30, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        </tbody>\r\n                    </table>\r\n                </section>\r\n";
},"30":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifLevelLowerOrEqual || (depth0 && depth0.ifLevelLowerOrEqual) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].topic : depths[1]),depth0,(depths[1] != null ? depths[1].level : depths[1]),{"name":"ifLevelLowerOrEqual","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"31":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.criteria : depth0),{"name":"each","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"32":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                            <tr class=\"criteria-"
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + " "
    + alias3((helpers.levelRequirementClass || (depth0 && depth0.levelRequirementClass) || alias2).call(alias1,(depths[2] != null ? depths[2].topic : depths[2]),depths[1],(depths[2] != null ? depths[2].level : depths[2]),{"name":"levelRequirementClass","hash":{},"data":data}))
    + "\">\r\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.index),{"name":"unless","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                <td>"
    + alias3(container.lambda(depth0, depth0))
    + "</th>\r\n                                    <td class=\"input\"><textarea cols=\"40\" rows=\"8\"></textarea></td>\r\n                                    <td class=\"input\"><textarea cols=\"40\" rows=\"8\"></textarea></td>\r\n                                    <td class=\"input\"><textarea cols=\"40\" rows=\"8\"></textarea></td>\r\n                                    <td class=\"input\"><textarea cols=\"40\" rows=\"8\"></textarea></td>\r\n                            </tr>\r\n";
},"33":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                                <td rowspan=\""
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].criteria : depths[1])) != null ? stack1.length : stack1), depth0))
    + "\"><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].competency : depths[1])) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1((depths[1] != null ? depths[1].title : depths[1]), depth0))
    + "</a></th>\r\n";
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <section class=\"role-competency box\">\r\n                    <h2><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a> - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.level : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h2>\r\n                    <h3><a href=\"/competencies/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.path : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></h3>\r\n                    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.level : depth0)) != null ? stack1.criteria : stack1),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\r\n                </section>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.departments : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.roles : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true}));

Handlebars.registerPartial("test", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li>\r\n            <a href=\"/competencies/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" class=\"nav-link\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n            <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </li>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                <li><a href=\"/competencies/"
    + alias1(container.lambda((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<li class=\"title\">\r\n    <span>🤹 Competencies</span>\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</li>\r\n";
},"useData":true,"useDepths":true}));

this["templates"]["competencies"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section class=\"competency\" data-path=\"/competencies/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"box-container\">\r\n        <div class=\"box\">\r\n            <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n            <div class=\"box-inner-container\">\r\n                <ol>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                    <li><a class=\"topic\" href=\"/competencies/"
    + alias1(container.lambda((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "    <section class=\"topic\" data-path=\"/competencies/"
    + alias2(alias1((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias2(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"box\">\r\n            <h1>"
    + alias2(alias1((depths[1] != null ? depths[1].title : depths[1]), depth0))
    + " - "
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n            <div class=\"box-inner-container\">\r\n                <p>"
    + alias2(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</p>     \r\n            </div>   \r\n        </div>\r\n        <h3>Levels</h3>\r\n        <div class=\"box-container\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.levels : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    </section>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <section class=\"level box item\">\r\n                <h3>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n                <div class=\"box-inner-container\">\r\n                    <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.criteria : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n            </section>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                        <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

this["templates"]["nav-competencies"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li>\r\n            <a href=\"/competencies/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" class=\"nav-link\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\r\n            <ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.topics : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </li>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing, alias4="function";

  return "                <li><a href=\"/competencies/"
    + alias1(container.lambda((depths[1] != null ? depths[1].path : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<li class=\"title\">\r\n    <span>🤹 Competencies</span>\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</li>\r\n";
},"useData":true,"useDepths":true});

this["templates"]["nav-roles"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navroles,depth0,{"name":"navroles","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"title\">\r\n    <span>👔 Roles</span>\r\n    <ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</li>";
},"usePartial":true,"useData":true});

this["templates"]["roles"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.rolesPartial,depth0,{"name":"rolesPartial","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"roles\" data-path=\"/roles\"></div>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
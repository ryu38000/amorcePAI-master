var template = require('./infirmier.html');
require('./infirmier.css');

module.exports = function (angularMod) {

    var Controller = function () {
        
    };

    angularMod.component("infirmiers", {
        template: template,
        bindings: {
            data: "<"
        },
        controller: Controller
    });
};

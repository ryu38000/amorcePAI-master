var template = require('./patienttoadd.html');
require('./patienttoadd.css');

module.exports = function (mod) {

    var controller = function (data) {
        var self= this;
         this.addPatient = function(){
          //  console.log(self.identifiants);
            data.addPatient(self.identifiants).then(function(){
                                                            window.location.reload();
            });
        };
    };

    var proxyNF = require("../../proxy/ProxyNF.js")(mod);
    controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component("patienttoadd", {
        template: template,
        controller: controller,        
        bindings: {
        }
    });
};





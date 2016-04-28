var template = require('./patient.html');
require('./patient.css');

module.exports = function (mod) {

    var Controller = function (data) {
         this.deletePatient = function(patientDel){
            console.log("Efface...");
            data.deletePatient(patientDel).then(function(){
                                                            console.log("done");
                                                            window.location.reload();
            });
        };
    };

    var proxyNF = require("../../proxy/ProxyNF.js")(mod);
    Controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component("patient", {
        template: template,
        bindings: {
            data: "<"
        },
        controller: Controller
    });
};

var template = require('./PatientsNonAffected.html');
require('./PatientsNonAffected.css');

module.exports = function (mod) {

    var Controller = function (dataP){
    	this.save = function (number){
    	   var affectP = {
                numberId: this.affect,
                numberPatient: number
           };
           dataP.affectPatient(affectP).then(function(){
                                                        window.location.reload();
           });
    	};
        this.deletePatient = function(patientDel){
            console.log(patientDel);
            console.log("Efface...");
            dataP.deletePatient(patientDel).then(function(){
                                                            console.log("done");
                                                            window.location.reload();
            });
        };
    };
    
    var proxyNF = require("../../proxy/ProxyNF.js")(mod);
    Controller.$inject = [ proxyNF ]; // Injection de dépendances

    mod.component("patientsnonaffected", {
        template: template,
        bindings: {
            data:"<",
            inf:"<"
        },
        controller: Controller
    });
};

var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

module.exports = function(mod) {
	var controller = function(dataT) {
		var self = this;
		var infoS = false;

		// Cette fonction sera appelée pour instancier un cabinet
		console.log("J'essaye de récupérer les data...");
			
		dataT.getData().then(function(response){
			//console.log("Les datas sont récup");
			self.informations = response.information;
			self.infirmiers = response.infirmiers;
			self.patients = response.patientsRestant;
		});
		
		/*self.MenuElement = {
	        Infirmier: false,
	        //PatientsAffectes: false,
	        PatientsNonAffectes: false,
	        AjouterPatients: false
	    }*/


/*        this.showContent = function (ctt){
        	for(var el in self.MenuElement){
        		self.MenuElement[el] = false;
        		//console.log(el);
        	}
        	self.MenuElement[ctt] = true;
        	//console.log(ctt);
        }*/

        this.showInfo = function(){
	   		if(!this.infoS){
	   			this.infoS=true;
	   		}
	   		else{
	   			this.infoS=false;
	   		}
	    	
        };
	};

	var proxyNF = require("../../proxy/ProxyNF.js")(mod);
	controller.$inject = [ proxyNF ]; // Injection de dépendances

	mod.component( "cabinetMedical", {
	template : template,
	bindings : {
		titre: "@"
	},
	controller : controller
	});
};
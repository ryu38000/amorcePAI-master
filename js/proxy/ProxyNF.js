var proxyNF = function($http) {
//	console.log("service proxyNF instancié");
	// Ajoutez le code de construction du service
	// Cette fonction sera appelée pour instancier un objet service


	 this.getData = function(){

			// Utilisez $http pour télécharger la base de données
			return  $http.get ( "../../data/cabinetInfirmier.xml" ).then(processData);
			
	 };
		
	function processData(data){
		var cabinetMedical = {
		patientsRestant:[],
		infirmiers:{},
		information:{}
		};

		var parser = new DOMParser();
		var doc = parser.parseFromString(data.data, "text/xml");
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// INFIRMIERS 																														////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var infirmier, infirmierXML, infirmierX,idInf;
		infirmierXML = doc.querySelectorAll("infirmier");

		for(var i =0; i<infirmierXML.length; i++){
			
			infirmierX=infirmierXML[i];
			idInf = infirmierX.getAttribute("id");

			infirmier = {
					"name": infirmierX.querySelector("nom").textContent,
					"surname":infirmierX.querySelector("prenom").textContent,
					"photo":infirmierX.querySelector("photo").textContent,
					"id":idInf,
					patients : []
			};
			cabinetMedical.infirmiers[idInf] = infirmier;
		}
		//	console.log(cabinetMedical);
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// PATIENTS 																															////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var patient, patientXML, patientX, adresseXML;

		patientXML = doc.querySelectorAll("patient");

		for(i = 0; i<patientXML.length; i++){
			patientX = patientXML[i];
			adresseXML=patientX.querySelector("adresse");

			patient={
					nom:patientX.querySelector("nom").textContent,
					prenom:patientX.querySelector("prenom").textContent,
					sexe:patientX.querySelector("sexe").textContent,
					naissance:patientX.querySelector("naissance").textContent,
					numero:patientX.querySelector("numero").textContent,
					adresse:{
								rue:adresseXML.querySelector("rue").textContent,
								ville:adresseXML.querySelector("ville").textContent,
								codePostal:adresseXML.querySelector("codePostal").textContent
					}
				
			};
			//pas tous les patients ont un numero et un etage dans leur adresse
			if(adresseXML.querySelector("numero")!==null){
				patient.adresse.numero=adresseXML.querySelector("numero").textContent;
			}
			if(adresseXML.querySelector("etage")!==null){
				patient.adresse.etage=adresseXML.querySelector("etage").textContent;
			}

			// recherche intervenant sur patient
			var visit = patientX.querySelector("visite[intervenant]");
			var id;

			if(visit===null || visit.getAttribute("intervenant")===""){
				cabinetMedical.patientsRestant.push(patient);
			} else {

				patient.intervenant=visit.getAttribute("intervenant"); 
				id=visit.getAttribute("intervenant");
				cabinetMedical.infirmiers[id].patients.push(patient);

			}
		}	
		//console.log(cabinetMedical);

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// CABINET MEDICAL INFOS 																												////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var info = {
				name: doc.querySelector("cabinet nom").textContent,
				adresse: {
							numero: doc.querySelector("cabinet adresse numero").textContent,
                            rue: doc.querySelector("cabinet adresse rue").textContent,
                            ville: doc.querySelector("cabinet adresse ville").textContent,
                            cp: doc.querySelector("cabinet adresse codePostal").textContent
                        }
                    }
        cabinetMedical.information = info;
        //console.log(cabinetMedical);
		return cabinetMedical;
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Ajout d'un patient 																												////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	this.addPatient = function(datapatient) {
		var patient = 
		{
		    patientName: datapatient.name || '',
		    patientForname: datapatient.firstname || '',
		    patientNumber: datapatient.number || '',
		    patientSex: datapatient.gender || '',
		    patientBirthday: datapatient.birthdate || '',
		    patientFloor: datapatient.adressFloor || '',
		    patientStreet: datapatient.adressStreet || '',
		   	patientPostalCode: datapatient.adressPostcode || '',
		    patientCity: datapatient.adressCity || ''    
		};
		
		return $http.post("/addPatient", patient);
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Ajout d'un patient 																												////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.affectPatient = function(dataPatientInfirmier){
		var data = {
				infirmier: dataPatientInfirmier.numberId,
				patient: dataPatientInfirmier.numberPatient
			};
			return $http.post("/affectation", data);
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//// Suppresion d'un patient 																												////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.deletePatient = function(dataPatient){
			return $http.post("/rmPatient", dataPatient);
	}


}


proxyNF.$inject = [ "$http" ]; // Injection de dépendances

module.exports = function(mod) {
var id = "proxyNF";
mod.service(id, proxyNF);
return id;
};
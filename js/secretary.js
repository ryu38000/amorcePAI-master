// feuille de style principale
require("./secretary.css");

var angular = require("angular"), 
	angularMaterial = require("angular-material");
require("angular-material/angular-material.css");

var cabinetModule = angular.module("cabinet",[angularMaterial]);

require("./proxy/ProxyNF.js")(cabinetModule);

// définir le composant cabinet medical
require("./Component/CabinetMedical/cabinetMedical.js")(cabinetModule);

// définir le composant infirmier
require("./Component/Infirmiers/infirmier.js")(cabinetModule);

// définir le composant patient
require("./Component/Patients/patient.js")(cabinetModule);

// définir le composant patienttoadd
require("./Component/PatientsToAdd/patienttoadd.js")(cabinetModule);

// définir le composant PatientsNonAffected
require("./Component/PatientsNonAffected/patientsnonaffected.js")(cabinetModule);
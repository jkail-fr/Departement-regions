/*************************Generation des listes**************************//*Liste nom département*/var datalistNomDept ="";for (let i=0; i != geoParse.geolist.length; i++){	datalistNomDept += '<option value="' +geoParse.geolist[i].dep_name+'">';}document.getElementById('liste-departement').innerHTML = datalistNomDept;var depList = document.getElementById('deplist')depList.removeAttribute("disabled");depList.placeholder="Nom Dept";/*Liste Ancienne région*/var datalistNomOldReg ="";for (let i=0; i != geoParse.geolist.length; i++){	let searchText = '<option value="' +geoParse.geolist[i].ancienne_region+'">';	result = datalistNomOldReg.search(searchText);	/*Pour réduire les occurences , sinon on a une région par département)*/	if (result == -1)	{			datalistNomOldReg += '<option value="' +geoParse.geolist[i].ancienne_region+'">';	}		/*Il faudra appliquer le meme code que les nouvelles régions, pour les doublons*/}document.getElementById('liste-oldregion').innerHTML = datalistNomOldReg;var oldRegList = document.getElementById('oldreglist')oldRegList.removeAttribute("disabled");oldRegList.placeholder="Nom Ancienne Reg";/*Liste Région*/var datalistNomReg ="";for (let i=0; i != geoParse.geolist.length; i++){	let searchText = '<option value="' +geoParse.geolist[i].region_name+'">';	result = datalistNomReg.search(searchText);	/*Pour réduire les occurences , sinon on a une région par département)*/	if (result == -1)	{			datalistNomReg += '<option value="' +geoParse.geolist[i].region_name+'">';	}}document.getElementById('liste-region').innerHTML = datalistNomReg;var regList = document.getElementById('reglist')regList.removeAttribute("disabled");regList.placeholder="Nom Région";/*********************************Gestion des évènements et affichage********************************/function resetAndEmpty()/*Vide les inputs existants*/{	let inputs = document.getElementsByTagName('input');	for (let i = 0; i<inputs.length; i++)	{		inputs[i].value= null;	}}function tableHeader(getArea){					let tableResult = document.getElementById(getArea);						tableResult.innerHTML='<table id="resultList"></table>';					let headerContent=document.getElementById('resultList');						let entete = headerContent.insertRow(0);					entete.insertCell(0).innerHTML ="Numéro";					entete.insertCell(1).innerHTML ="Département";					entete.insertCell(2).innerHTML ="Ancienne région";					entete.insertCell(3).innerHTML ="Région";}function displayResultTable(getTable,JSONDataposition){		/*Affiche le resultat dans un tableau cible*/					let row=1;					let ligne = getTable.insertRow(row);					let td0 = ligne.insertCell(0);					let td1 = ligne.insertCell(1);					let td2 = ligne.insertCell(2);					let td3 = ligne.insertCell(3);					td0.innerHTML = geoParse.geolist[JSONDataposition].num_dep;					td1.innerHTML = geoParse.geolist[JSONDataposition].dep_name;					td2.innerHTML = geoParse.geolist[JSONDataposition].region_name;					td3.innerHTML = geoParse.geolist[JSONDataposition].ancienne_region;					row++;					}function displayNoResult(getArea) {					let existingResult = document.getElementById(getArea);					if (existingResult != null)					{						let tableResult = document.getElementById(getArea);						let tableCount = tableResult.rows.length;						if (tableCount == 1)						{						let ligne = tableResult.insertRow(1);						let td0 = ligne.insertCell(0);						td0.innerHTML = 'Pas de résultats';						td0.setAttribute('colspan', 4);						}					}}function resetResult(getArea) {			let tableResult = document.getElementById(getArea);			tableResult.innerHTML="";}/*Numero de département*/var numDept = document.getElementById('num-dept');var buttonNum = document.getElementById('buttonNum');/* Si le chiffre des 9 premier département ne contient pas le zéro, comme dans le json, on le rajoute)*/var conversionChiffre = ["1","2","3","4","5","6","7","8","9"];numDept.addEventListener('click', function() {	resetAndEmpty();	resetResult('zone-resultat');	tableHeader('zone-resultat');	});numDept.addEventListener('input', function () {	/*On ajoute le 0 pour les 9 premiers chiffres afin de coller avec la valeur du JSON)*/		if (conversionChiffre.indexOf((numDept.value)) != -1)		{			searchNumber = '0'+numDept.value;		}		else 		{			searchNumber = numDept.value;		}				let tableResult = document.getElementById('resultList');		/*On vérifie qu'il n'y a pas de lettres ou que le chiffre est bon (dom-tom et département) */		/*var regexDepartement = /[A-Za-z]|([9][6-9]-97[0-9])/;*/		/*if regex az-AZ uo 96+ ou - 971 ou +978? alors pas de resuktat		/* si on trouve un resultat de la regex, allors on affiche pas de resultat (if, et else if on afiche le reusltat)*/		for ( let data=0; data < geoParse.geolist.length; data++)		{			if (searchNumber == geoParse.geolist[data].num_dep)			{					displayResultTable(tableResult,data);				tableResult.deleteRow(2);			}		}			if (tableResult.tBodies[0].rows.length == 1)		{			displayNoResult('resultList');		}});depList.addEventListener('click', function() {	resetAndEmpty();	resetResult('zone-resultat');	tableHeader('zone-resultat');	});depList.addEventListener('input', function () {			let tableResult = document.getElementById('resultList');			for ( let data=0; data < geoParse.geolist.length; data++)			{				if (depList.value == geoParse.geolist[data].dep_name)				{						displayResultTable(tableResult,data);				}			}			if (tableResult.tBodies[0].rows.length == 1)			{				displayNoResult('resultList');			}			        });		oldRegList.addEventListener('click', function() {	resetAndEmpty();	resetResult('zone-resultat');	tableHeader('zone-resultat');	});oldRegList.addEventListener('input', function () {			let tableResult = document.getElementById('resultList');			for (let data=0; data < geoParse.geolist.length; data++)			{					if (oldRegList.value == geoParse.geolist[data].ancienne_region)				{					displayResultTable(tableResult,data);				}			}			if (tableResult.tBodies[0].rows.length == 1)			{				displayNoResult('resultList');			}			        });regList.addEventListener('click', function() {	resetAndEmpty();	resetResult('zone-resultat');	tableHeader('zone-resultat');	});regList.addEventListener('input', function () {			let tableResult = document.getElementById('resultList');			for (let data=0; data < geoParse.geolist.length; data++)			{					if (regList.value == geoParse.geolist[data].region_name)				{					displayResultTable(tableResult,data);				}			}				if (tableResult.tBodies[0].rows.length == 1)			{				displayNoResult('resultList');			}        });
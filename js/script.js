/*************************Generation des listes**************************//*Liste nom département*/var datalistNomDept ="";for (let i=0; i != geoParse.geolist.length; i++){	datalistNomDept += '<option value="' +geoParse.geolist[i].dep_name+'">';}document.getElementById('liste-departement').innerHTML = datalistNomDept;var depList = document.getElementById('deplist')depList.removeAttribute("disabled");depList.placeholder="Nom Dept";/*Liste Ancienne région*/var datalistNomOldReg ="";for (let i=0; i != geoParse.geolist.length; i++){	let searchText = '<option value="' +geoParse.geolist[i].ancienne_region+'">';	result = datalistNomOldReg.search(searchText);	/*Pour réduire les occurences , sinon on a une région par département)*/	if (result == -1)	{			datalistNomOldReg += '<option value="' +geoParse.geolist[i].ancienne_region+'">';	}		/*Il faudra appliquer le meme code que les nouvelles régions, pour les doublons*/	/*datalistNomOldReg += '<option value="' +geoParse.geolist[i].ancienne_region+'">';*/}document.getElementById('liste-oldregion').innerHTML = datalistNomOldReg;var oldRegList = document.getElementById('oldreglist')oldRegList.removeAttribute("disabled");oldRegList.placeholder="Nom Ancienne Reg";/*Liste Région*/var datalistNomReg ="";/*let result ="";*/for (let i=0; i != geoParse.geolist.length; i++){	let searchText = '<option value="' +geoParse.geolist[i].region_name+'">';	result = datalistNomReg.search(searchText);	/*Pour réduire les occurences , sinon on a une région par département)*/	if (result == -1)	{			datalistNomReg += '<option value="' +geoParse.geolist[i].region_name+'">';	}}document.getElementById('liste-region').innerHTML = datalistNomReg;var regList = document.getElementById('reglist')regList.removeAttribute("disabled");regList.placeholder="Nom Région";/*********************************Gestion des évènements et affichage********************************//*function reset tbody + fonction afficher pas de résultat + fonction afficher cellue (prob row position a mettre dans le if)*/function displayResultTable(getTable,JSONDataposition){							let ligne = getTable.insertRow(1);					let td0 = ligne.insertCell(0);					let td1 = ligne.insertCell(1);					let td2 = ligne.insertCell(2);					let td3 = ligne.insertCell(3);					td0.innerHTML = geoParse.geolist[JSONDataposition].num_dep;					td1.innerHTML = geoParse.geolist[JSONDataposition].dep_name;					td2.innerHTML = geoParse.geolist[JSONDataposition].region_name;					td3.innerHTML = geoParse.geolist[JSONDataposition].ancienne_region;					}/*Numero de département*/var numDept = document.getElementById('num-dept');var buttonNum = document.getElementById('buttonNum');/* Si le chiffre des 9 premier département ne contient pas le zéro, comme dans le json, on le rajoute)*/var conversionChiffre = ["1","2","3","4","5","6","7","8","9"];numDept.addEventListener('input', function () {			if (conversionChiffre.indexOf((numDept.value)) != -1)		{			searchNumber = '0'+numDept.value;		}		else 		{			searchNumber = numDept.value;		}		for ( let i=0; i != geoParse.geolist.length; i++)			{				if (searchNumber == geoParse.geolist[i].num_dep)				{						let tableResult = document.getElementById('resultList');					tableResult.deleteRow(1);					displayResultTable(tableResult,i);					break;				}				else				{						/*deleteRows('resultList');*/					/*noResults('resultList');*/					/*break;*/				}			}	});depList.addEventListener('input', function () {			for ( let i=0; i != geoParse.geolist.length; i++)			{				if (depList.value == geoParse.geolist[i].dep_name)				{						let tableResult = document.getElementById('resultList');					tableResult.deleteRow(1);					displayResultTable(tableResult,i);					break;				}				else				{					/*noResults('resultList');*/				}			}				        });		oldRegList.addEventListener('input', function () {			let tableResultBody = document.querySelectorAll("#resultList");			tableResultBody.innerHTML ='<p>toto</p>';			let tableResult = document.getElementById('resultList');			for ( let i=0; i != geoParse.geolist.length; i++)			{				if (oldRegList.value == geoParse.geolist[i].ancienne_region)				{										displayResultTable(tableResult,i);					break;				}				else				{										i++;				}			}		        });regList.addEventListener('input', function () {			for ( let i=0; i != geoParse.geolist.length; i++)			{				if (regList.value == geoParse.geolist[i].region_name)				{					document.getElementById("demo").innerHTML +=  geoParse.geolist[i].num_dep + " " + geoParse.geolist[i].dep_name + " " + geoParse.geolist[i].region_name + " " + geoParse.geolist[i].ancienne_region; 				}				else				{										i++;				}			}		        });
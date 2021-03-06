function clearNewClass() {
	clearTags();
	document.querySelector('.class-name').value = "";
	document.querySelector('#tag-input').value = "";
	tags = [];
}
function createNewClass() {
	let className = document.querySelector('.class-name').value;
	let students = [];
	for (let i=0; i<tags.length; i++) {
		students.push({
			'name': tags[i],
			'marked': false,
			'overwrite': false
		});
	}

	clearNewClass();
	document.getElementById('card1').style.visibility = 'hidden';

	let cls = {
		'name': className,
		'students': students,
		'id': Date.now()
	};

	chrome.storage.sync.get(['classes'], function (result) {
		classes = result.classes;
		classes.push(cls);
		if (fromEdit != -1) {
			classes.splice(getIndexOfClassById(fromEdit, classes), 1);
			fromEdit = -1;
		}
		chrome.storage.sync.set({'classes': classes}, null);
	});
}
function cancelNewClass() {
	clearNewClass();
	document.getElementById('card1').style.visibility = 'hidden';
}

function getIndexOfClassById(id, classes) {
    for (let i=0; i<classes.length; i++)
        if (classes[i].id == id)
            return i;
    return -1;
}

function updateSelectClassChoice(callback) {
    let select = document.querySelector('.class-choice');
    chrome.storage.sync.get(['classes'], function (result) {
		if (result.classes !== undefined) {
			result.classes.forEach((cls) => {
				var option = document.createElement("option");
				option.text = cls.name;
				option.value = cls.id;
				select.add(option);
			});
		}
		callback(true);
	});
}

function AddHTMLCard() {
    const infoOnMeet = document.getElementsByClassName('ggUFBf')[1];
    infoOnMeet.insertAdjacentHTML('afterbegin', cardHTML2);
    
    //Language thingy
    chrome.storage.sync.get(['lang'], function(response) {
    	let currentLang = response.lang;
	    document.querySelector('.card-title-2').innerText = meetLanguage[currentLang]['cardHTML2']['card_title_2'];
	    document.querySelector('.class-choice-name').innerText = meetLanguage[currentLang]['cardHTML2']['class_choice_name'];
	    document.querySelector('.show-choice-name').innerText = meetLanguage[currentLang]['cardHTML2']['show_choice_name'];
	    meetLanguage[currentLang]['cardHTML2']['show_choice'].forEach((elm)=> {
	    	let option = document.createElement('option');
	    	option.text = elm;
	    	document.querySelector('.show-choice').appendChild(option);
	    });
	    document.querySelector('.class-start-time-name').innerText = meetLanguage[currentLang]['cardHTML2']['class_start_time_name'];
	    document.querySelector('.save-button').innerText = meetLanguage[currentLang]['cardHTML2']['save_button'];
    });
    //------------------------

    updateSelectClassChoice(function(ifAdded) {
    	let select = document.querySelector('.class-choice');
    	let sortTime = document.querySelector('.show-choice');

    	let op1 = select.options[savedIndexSelectedClass];
    	if (op1 != null) op1.selected = true;

    	if (ifAdded) createAttendance();
    });
    document.querySelector('.class-start-time').value = savedTimeChoosenStartTime;
    document.querySelector('.save-button').addEventListener('click', exportAttendance, false);

    document.querySelector('.class-choice').onchange = sendFillClassList;
    document.querySelector('.show-choice').onchange = sendFillClassList;
    document.querySelector('.class-start-time').onchange = sendFillClassList;

    if (updatedObserver === undefined) {
	    updatedObserver = new MutationObserver(function(mutation) {
	        AddHTMLCard();
	    });
	    updatedObserver.observe(document.querySelector('.GvcuGe'), {
	        childList: true,
	        subtree: true,
	    });
	}
}
function sendFillClassList() {
	window.postMessage(
		{
			sender: 'fill-class-list',
		},
		'https://meet.google.com');
}




function cancelChoice() {
    document.getElementById('card2').style.visibility = 'hidden';
}
function OkChoice() {
	let select = document.querySelector('.choose-2');
	let text = document.getElementById('Okay-2').innerText;
	switch(true) {
		case text == 'EDIT' || text == 'ИЗМЕНИТЬ': {
			editClass(select.options[select.selectedIndex].value);
			break;
		}
		case text == 'DELETE' || text == 'УДАЛИТЬ': {
			deleteClass(select.options[select.selectedIndex].value);
			break;
		}
	}
	document.getElementById('card2').style.visibility = 'hidden';
}

function addClass() {
    document.getElementById('card1').style.visibility = 'visible';
}
function deleteClass(id) {
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;

        classes.splice(getIndexOfClassById(id, classes), 1);
        chrome.storage.sync.set({'classes': classes}, null);
    });
}
function editClass(id) {
	document.getElementById('card1').style.visibility = 'visible';
	updateCard1();
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;
        
        let i = getIndexOfClassById(id, classes);
        fromEdit = id;
        classes[i].students.forEach((student) => {
            tags.push(student.name);
        });
        addTags();
        document.querySelector('.class-name').value = classes[i].name;
    });
}
function updateChoiceBox() {
	let select = document.querySelector('.choose-2');
	select.innerText = null;
	
	function fixasync(callback) {
		chrome.storage.sync.get(['classes'], function (result) {
			if (result.classes !== undefined) {
				result.classes.forEach((cls) => {
					var option = document.createElement("option");
					option.text = cls.name;
					option.value = cls.id;
					select.add(option);
				});
				callback(true);
			}
		});
	}
	fixasync(function(ye) {
		if (ye) {select.selectedIndex = 0;}
	});
}

function injectCurrentParticipants() {
	joined = JSON.parse(sessionStorage.getItem('joined'));
	joined.forEach((student) => {
		let no = false;
		for (let i=0; i<tags.length; i++)
			if (tags[i] == student.name) {
				no = true;
				break;
			}
		if (!no) tags.push(student.name);
	});
	addTags();
}

function getCurrentDateFormat() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	return mm + '/' + dd + '/' + yyyy;
}

function exportAttendance() {
	let text = "";
	let listName = document.querySelectorAll('.student>p');
	let listTime = document.querySelectorAll('.student>button');
	for (let i=0; i<listName.length; i++) {
		text += `${listTime[i].label} -=- ${listName[i].innerText}\n`;
	}

	let filename = ""; //[class]-[TimeStamp]-[date].txt format
	let select = document.querySelector('.class-choice');
    let sortTime = document.querySelector('.show-choice');
	
	//sortTime.options[sortTime.selectedIndex].text;
	filename += select.options[select.selectedIndex].text + '-';
	filename += sortTime.options[sortTime.selectedIndex].text + '-';
	filename += getCurrentDateFormat() + '.txt';

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
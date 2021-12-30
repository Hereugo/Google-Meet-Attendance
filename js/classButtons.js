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

    updateSelectClassChoice(function(ifAdded) {
    	let select = document.querySelector('.class-choice');
    	let sortTime = document.querySelector('.show-choice');

    	let op1 = select.options[savedIndexSelectedClass];
    	if (op1 != null) op1.selected = true;

    	if (ifAdded) createAttendance();
    });
    document.querySelector('.class-start-time').value = savedTimeChoosenStartTime;

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
	switch(document.getElementById('Okay-2').innerText) {
		case 'EDIT': {
			editClass(select.options[select.selectedIndex].value);
			break;
		}
		case 'DELETE': {
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
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;
        
        let i = getIndexOfClassById(id, classes);
        
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
		tags.push(student.name);
	});
	addTags();
}
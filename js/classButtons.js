function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearCards() {
	clearTags();
	$('.class-name').val("");
	$('#tag-input').val("");
	tags = [];
}

function createNewClass() {
	let className = $('.class-name').val();
	let students = [];
	for (let i=0; i<tags.length; i++) {
		students.push({
			'name': tags[i],
			'marked': false,
			'overwrite': false
		});
	}

	clearCards();
	$('#card1').css({visibility: 'hidden'});

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
function getParent(count, element) {
	if (count == 0) return element;
	return getParent(count-1, element.parentNode);
}

function cancelCard() {
	clearCards();
	let card = getParent(3, this);
	card.style.visibility = 'hidden';
}


function getIndexOfClassById(id, classes) {
    for (let i=0; i<classes.length; i++)
        if (classes[i].id == id)
            return i;
    return -1;
}

function updateSelectClassChoice(callback) {
    let select = $('.class-choice');
    chrome.storage.sync.get(['classes'], function (result) {
		if (result.classes !== undefined) {
			result.classes.forEach((cls) => {
				var option = $(document.createElement("option"));
				option.prop({innerText: cls.name, value: cls.id});
				select.append(option);
			});
		}
		callback(true);
	});
}

async function AddHTMLCard() {
	await sleep(300);
    const infoOnMeet = $('.ggUFBf:nth(1)');
    infoOnMeet.prepend(attendanceHTML);
    
    //Language thingy--------
    chrome.storage.sync.get(['lang'], function(response) {
    	let currentLang = response.lang;
	    
	    $('.card-title-2').text(meetLanguage[currentLang]['attendanceHTML']['card_title_2']);
	    $('.class-choice-name').text(meetLanguage[currentLang]['attendanceHTML']['class_choice_name']);
	    $('.show-choice-name').text(meetLanguage[currentLang]['attendanceHTML']['show_choice_name']);

	    meetLanguage[currentLang]['attendanceHTML']['show_choice'].forEach((elm)=> {
	    	let option = $(document.createElement('option')).text(elm);
	    	$('.show-choice').append(option);
	    });
	    $('.class-start-time-name').text(meetLanguage[currentLang]['attendanceHTML']['class_start_time_name']);
	    $('.save-button').text(meetLanguage[currentLang]['attendanceHTML']['save_button']);
    });
    //------------------------



   	//// JQUERY TODO STOPPED 00:04 AM OOF 
    updateSelectClassChoice(function(ifAdded) {
    	let option = $(`.class-choice option:nth-child(${savedIndexSelectedClass})`);
    	if (option != undefined) option.attr({selected: true});

    	if (ifAdded) createAttendance();
    });
    $('.class-start-time').val(savedTimeChoosenStartTime);
    $('.save-button').click(exportAttendance);

    $('.class-choice').change(sendFillClassList);
    $('.show-choice').change(sendFillClassList);
    $('.class-start-time').change(sendFillClassList);

    if (updatedObserver === undefined) {
	    updatedObserver = new MutationObserver(async function(mutation) {
	        await AddHTMLCard();
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

function editChoice() {
	let select_value = $('#card2 .choose-2').find(":selected").val();
	editClass(select_value);
	$('#card2').css({visibility: 'hidden'});
}
function deleteChoice() {
	let select_value = $('#card3 .choose-2').find(":selected").val();
	deleteClass(select_value);
	$('#card3').css({visibility: 'hidden'});
}


function addClass() {
    $('#card1').css({visibility: 'visible'});
}
function deleteClass(id) {
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;

        classes.splice(getIndexOfClassById(id, classes), 1);
        chrome.storage.sync.set({'classes': classes}, null);
    });
}
function editClass(id) {
	
	$('#card1').css({visibility: 'visible'});

	updateCards();
    chrome.storage.sync.get(['classes'], function (request) {
        let classes = request.classes;
        
        let i = getIndexOfClassById(id, classes);
        fromEdit = id;
        classes[i].students.forEach((student) => {
            tags.push(student.name);
        });
        addTags();
        $('.class-name').val(classes[i].name);
    });
}
function updateChoiceBox(elemName) {
	let select = $(`#${elemName} .choose-2`);
	select.html('');
	
	function fixasync(callback) {
		chrome.storage.sync.get(['classes'], function (result) {
			if (result.classes !== undefined) {
				result.classes.forEach((cls) => {
					var option = $(document.createElement("option"));
					option.prop({innerText: cls.name, value: cls.id});
					select.append(option);
				});
				callback(true);
			}
		});
	}
	fixasync(function(ye) {
		if (ye) select.prop({selectedIndex: 0});
	});
}

function injectCurrentParticipants() {
	joined = JSON.parse(sessionStorage.getItem('joined'));

	for (let [name, time] of Object.entries(joined)) {
		let no = false;
		for (let i=0; i<tags.length; i++)
			if (tags[i] == name) {
				no = true;
				break;
			}
		if (!no) tags.push(name);
	}
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
	let listName = $('.student p');
	let listTime = $('.student button');
	console.log(listName, listTime);
	for (let i=0; i<listName.length; i++) {
		text += `${listTime[i].innerText} ${listName[i].innerText}\n`;
	}

	console.log(text);

	let filename = `${$('.class-choice').find(":selected").text()}-${$('.show-choice').find(':selected').text()}-${getCurrentDateFormat()}.txt`;

	console.log(filename);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
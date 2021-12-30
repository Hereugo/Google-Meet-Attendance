 document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if (!tabs[0].url.match(/https:\/\/meet.google.com\/.+-.+-.+/)) return;

		function sendData(data) {
			chrome.tabs.sendMessage(tabs[0].id, {data: data});
			window.close();
		}

		$('.add').click(() => sendData('add-class'));
		$('.edit').click(() => sendData('edit-class'));
		$('.del').click(() => sendData('del-class'));


		let langChoice = $('.language-choice');
		langChoice.change(function() {
			let currentLang = langChoice.find(':selected').text();
			chrome.storage.sync.set({'lang': currentLang}, null);
			updatePopup(currentLang);
			chrome.tabs.sendMessage(tabs[0].id, {data: 'translate'});
		});

		chrome.storage.sync.get(['lang'], function(request) {
			langChoice.find('option').each(function() {
				if (this.text == request.lang) this.selected = true;
			});

			updatePopup(request.lang);
		});
	});
}, false)

function updatePopup(currentLang) {
	$('header p').text(meetLanguage[currentLang]['popup']['popup_name']);	
	$('#HELP').attr('href', meetLanguage[currentLang]['popup']['link']);
}

const meetLanguage = {
	en: {
		popup: {
			popup_name: 'Class',
			link: 'https://www.youtube.com/watch?v=xhnKGd76ZOg',
		},
	},
	ru: {
		popup: {
			popup_name: 'Класс',
			link: 'https://www.youtube.com/watch?v=VyXnD_9f6Kg',
		},
	}
}
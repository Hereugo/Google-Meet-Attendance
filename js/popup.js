document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		document.querySelector('.popup-add-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'add-class'});
			window.close();
		}, false);
		document.querySelector('.popup-edit-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'edit-class'});
			window.close();
		}, false);
		document.querySelector('.popup-del-class').addEventListener('click', function() {
			chrome.tabs.sendMessage(tabs[0].id, {data: 'del-class'});
			window.close();
		}, false);
		let langChoice = document.querySelector('.language-choice');
		langChoice.onchange = function() {
			let currentLang = langChoice.options[langChoice.selectedIndex].text;
			chrome.tabs.sendMessage(tabs[0].id, {data: 'upd-lang', value: currentLang}, function(r) {
				updatePopup(r.data, currentLang);
			});
		};

		chrome.tabs.sendMessage(tabs[0].id, {data: 'get-lang'}, function(repsonse) {
			for (let i=0; i<langChoice.length; i++) {
				if (langChoice.options[i].text == repsonse.data) {
					langChoice.options[i].selected = true;
					break;
				}
			}
			updatePopup(repsonse.v, repsonse.data);
		});
	});
}, false)

function updatePopup(r, currentLang) {
	document.querySelector('.popup-name').innerText = r[currentLang]['popup']['popup_name'];
	document.querySelector('.popup-add-class').innerText = r[currentLang]['popup']['popup_add_class'];
	document.querySelector('.popup-edit-class').innerText = r[currentLang]['popup']['popup_edit_class'];
	document.querySelector('.popup-del-class').innerText = r[currentLang]['popup']['popup_del_class'];	
	document.querySelector('#language').innerText = r[currentLang]['popup']['language'];
}
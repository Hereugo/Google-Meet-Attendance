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
	});
}, false)

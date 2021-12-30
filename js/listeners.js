chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.data);
    switch(request.data) {
    	case "starting...": {
		    chrome.tabs.query({currentWindow: true, active: true }, function (tabs) {
		        let ready = false;
		        if (tabs[0].id === sender.tab.id) {
		        	ready = true;
		        }
		        sendResponse({ready: ready});
		    });
		    return true;
    	}
    }
});

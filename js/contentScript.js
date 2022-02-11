//Globals
var addClassCard, editClassCard, deleteClassCard, settingsCard;
var attedanceObserver;
const sessionStorage = window.sessionStorage;

// Setup
(async () => {
    onReady('.crqnQb', '.c8mVDd', () => {
        let s = document.createElement('script');
        s.src = chrome.runtime.getURL('js/inject.js');
        document.documentElement.appendChild(s);
        initialize();
    })
    
    // Storage setup init values
    sessionStorage.setItem('joined', JSON.stringify({}));
    let data = await getStorageData(null);

    await setStorageData({
        'classes': data.classes || [],
        'selectedClassID': data.selectedClassID || "",
        'selectedFilterID': data.selectedFilterID || "all",
        'selectedPeriod': data.selectedPeriod || "00:00",

        'language': data.language || "en",
    });
})()

window.addEventListener('message', (event) => {
    if (event.origin !== 'https://meet.google.com') return

    switch(event.data.sender) {
        case 'inject-message': {
            updateJoinedStudents(event.data.attendance);
            break;
        }
    }
});

function initialize() {
    chrome.runtime.sendMessage(
        {
            data: 'starting...',
        },
        function (response) {
            if (response.ready) {
                $('head').append(materialIconHTML);

                const screen = $('.crqnQb');

                addClassCard = new AddClassCard(screen);
                editClassCard = new EditClassCard(screen);
                deleteClassCard = new DeleteClassCard(screen);
                settingsCard = new SettingsCard(screen);

                attedanceObserver = new Attendance();
            }
        }
    );
}

function updateJoinedStudents(names) {
    let ctime = getCurrentTime();

    let joined = JSON.parse(sessionStorage.getItem('joined'));
    console.log(joined, names);

    // Add a new entry for each new student
    names.forEach(name => {
        if (!joined[name]) joined[name] = ctime;
    });
    
    // Remove entries for students who left
    Object.keys(joined).forEach(name => {
        if (!names.includes(name) && joined[name])
            delete joined[name];
    });

    sessionStorage.setItem('joined', JSON.stringify(joined));
}
const readyObserver = new MutationObserver(function (mutations, me) {
    if (document.getElementsByClassName('c8mVDd')[0]) {
        let s = document.createElement('script')
        s.src = chrome.runtime.getURL('js/inject.js')
        document.documentElement.appendChild(s)
        initialize();
        me.disconnect();
    }
})
readyObserver.observe(document.getElementsByClassName('crqnQb')[0], {
    childList: true,
    subtree: true,
});

//Globals
var updatedObserver = undefined;
var savedIndexSelectedClass = 1;


// create vars in chrome storage
chrome.storage.sync.get(null, function(result) {
    if (!result['classes']) {
        chrome.storage.sync.set({'classes': []}, null);
    }
    if (!result['joined']) {
        chrome.storage.sync.set({'joined': []}, null);
    }
})


function initialize() {
    chrome.runtime.sendMessage(
        {
            data: 'starting...',
        },
        function (response) {
            if (response.ready) {
                // Create divs and buttons
                const screen = document.getElementsByClassName('crqnQb')[0];

                screen.insertAdjacentHTML('afterbegin', cardHTML);
                document.getElementById('card1').style.visibility = 'hidden';
                
                screen.insertAdjacentHTML('afterbegin', cardHTML3);
                document.getElementById('card2').style.visibility = 'hidden';

                // Adding functions to buttons
                document.getElementById('Ok').addEventListener('click', createNewClass, false);
                document.getElementById('Cancel').addEventListener('click', cancelNewClass, false);
                document.getElementById('tag-input').addEventListener('keyup', addNewTag, false);
                document.querySelector('.tag-container').addEventListener('click', focusOnInput, false);
                document.addEventListener('click', deleteTagCheck, false);
                document.getElementById('Cancel-2').addEventListener('click', cancelChoice, false);
                document.getElementById('Okay-2').addEventListener('click', OkChoice, false);

                const tempButton = document.querySelector('.NzPR9b').firstElementChild;
                tempButton.addEventListener('click', AddHTMLCard, false);
            }
        }
    );
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log (request);
    switch(request.data) {
        case 'add-class': {
            document.getElementById('card1').style.visibility = 'visible';
            break;
        }
        case 'edit-class': {
            document.getElementById('card2').style.visibility = 'visible';

            updateChoiceBox();
            document.getElementById('Okay-2').className = "";
            document.getElementById('Okay-2').classList.add('Edit');
            document.getElementById('Okay-2').innerText = "Edit";
            break;
        }
        case 'del-class': {
            document.getElementById('card2').style.visibility = 'visible';

            updateChoiceBox();
            document.getElementById('Okay-2').className = "";
            document.getElementById('Okay-2').classList.add('Delete');
            document.getElementById('Okay-2').innerText = "Delete";
            break;
        }
    }
});


function twod(v) {
    return ('0'+Number(v)).slice(-2);
}
function toMinutes(time) { // time is string example: "10:43"
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3));
}

function choosenClass(classes) {
    let select = document.querySelector('.class-choice');
    return getIndexOfClassById(select.options[select.selectedIndex].value, classes);
}

// Save names and times when student entered to array 'joined' in chrome 
function storeNames(names) {
    let now = new Date(), ctime = now.getHours() + ':' + twod( now.getMinutes() );
    chrome.storage.sync.get(['joined'], function(request) { //Optimize, O(n^2)
        let joined = []
        for (let i=0; i<names.length; i++) {
            let flag = -1;
            request.joined.forEach((student, j) => {
                if (student.name == names[i])
                    flag = j;
            });
            if (flag == -1) {
                joined.push({
                    'name': names[i],
                    'time': ctime
                });
            } else {
                joined.push(request.joined[flag]);
            }
        }
        chrome.storage.sync.set({'joined': joined}, null);
    });
}

function updateOverwrite(data, callback) {
    let index = Number(data.idxs.match(/^\d+/));
    let flag = Number(data.idxs.match(/\d+$/));
    chrome.storage.sync.get(['classes'], function(request) {
        let classes = request.classes;
        classes[index].students[flag].overwrite = data.value;
        chrome.storage.sync.set({'classes': classes}, null);
        callback(true);
    });
}

function createAttendance() {
    let select = document.querySelector('.class-choice');
    let sortTime = document.querySelector('.show-choice');

    if (select.selectedIndex == -1) return;
    savedIndexSelectedClass = select.selectedIndex;


    let selectedTime = sortTime.options[sortTime.selectedIndex].text;

    let ul = document.querySelector('.list-students');
    ul.innerHTML = "";
    
    chrome.storage.sync.get(['joined', 'classes'], function(request) {    
        let classes = request.classes;
        let index = choosenClass(classes);
        
        for (let i=0; i<classes[index].students.length; i++)
            classes[index].students[i].marked = false;

        // Add Early and Late students to the list
        request.joined.forEach((student) => {
            let flag = -1;
            classes[index].students.forEach((std, idx) => {
                if (std.name == student.name)
                    flag = idx;
            });


            if (flag != -1 && !classes[index].students[flag].marked) {
                classes[index].students[flag].marked = true;

                let li = document.createElement('li');
                li.setAttribute('class', 'student');
                let name = document.createElement('p');
                name.innerText = student.name;

                let button = document.createElement('button');
                button.id = ('' + index) + '|' + ('' + flag);
                button.addEventListener('click', function() {
                    const colors = ['🟢', '🟡']; // green, yellow
                    for (let i=0; i<2; i++) 
                        if (this.innerText == colors[i]) {
                            window.postMessage(
                            {
                                sender: 'update-from-overwrite',
                                idxs: this.id,
                                value: colors[(i + 1) % 2],
                            },
                            'https://meet.google.com');
                            break;
                        }
                }, false);
                console.log(selectedTime, classes[index].students[flag])
                switch (selectedTime) {
                    case 'All': {
                        switch (classes[index].students[flag].overwrite) {
                            case false: {
                                if (toMinutes(student.time) <= toMinutes(classes[index].time))
                                    button.innerText = '🟢' // green
                                else
                                    button.innerText = '🟡' // yellow
                                break;
                            }
                            default: {
                                button.innerText = classes[index].students[flag].overwrite;
                                break;
                            }
                        }
                        break;
                    }
                    case 'Early 🟢': { // green
                        switch (classes[index].students[flag].overwrite) {
                            case false: {
                                if (toMinutes(student.time) <= toMinutes(classes[index].time))
                                    button.innerText = '🟢';
                                else
                                    return;
                                break;
                            }
                            case '🟢': {
                                button.innerText = '🟢';
                                break;
                            }
                            default: {
                                return;
                            }
                        }
                        break;
                    }
                    case 'Late 🟡': { // yellow
                        switch (classes[index].students[flag].overwrite) {
                            case false: {
                                if (toMinutes(student.time) > toMinutes(classes[index].time))
                                    button.innerText = '🟡';
                                else
                                    return;
                                break;
                            }
                            case '🟡': {
                                button.innerText = '🟡';
                                break;
                            }
                            default: {
                                return;
                            }
                        }
                        break;
                    }
                    case 'Gone 🔴': {
                        return;
                    }
                }
                
                li.appendChild(button);
                li.appendChild(name);
                

                ul.appendChild(li);
            }
        });

        //Add Gone students to the list
        if (selectedTime == 'All' || selectedTime == 'Gone 🔴')
            classes[index].students.forEach((student, flag) => {
                if (!student.marked) {
                    student.overwrite = false;
                    let li = document.createElement('li');
                    li.setAttribute('class', 'student');
                    let name = document.createElement('p');
                    name.innerText = student.name;

                    let button = document.createElement('button');
                    button.innerText = '🔴'; // red

                    li.appendChild(button);
                    li.appendChild(name);

                    ul.appendChild(li);
                }
            });

        chrome.storage.sync.set({'classes': classes}, null);
    });
}

window.addEventListener('message', (event) => {
    if (event.origin !== 'https://meet.google.com') return

    switch(event.data.sender) {
        case 'inject-message': {
            if (event.data.attendance) {
                storeNames(event.data.attendance);
            }
            break;
        }
        case 'fill-class-list': {
            createAttendance();
            break;
        }

        case 'update-from-overwrite': {
            updateOverwrite(event.data, function(ifUpdated) {
                if (ifUpdated) createAttendance();
            });
            break;
        }
    }
});
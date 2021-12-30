const classHTML = `
<div 
    id="card1"
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        " 
    class="card">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="background-shadow"></div>
    <div class="show-block">
        <h2 class="new-class-name"> New Class </h2>
        <div class="separator"></div>
        <div style="display: flex; flex-direction: row; align-items: center; margin: 0 0.5em;">
            <p class="input-name-class-name"> Class name </p>
            <input class="class-name"/>
        </div>
        <p class="student-names" style="width: auto;"> Student names </p>
        <div class="tag-container">
            <input id="tag-input"/>
        </div>
        <button id="ICP" class="hover-state"> Add All current students </button>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Ok" class="hover-state">Save</button>
        </div>
    </div>
</div>`;

const attendanceHTML = `
<div class="container">
    <h4 class="isOLae card-title-2" style="padding-left: 0px;">Attendance</h4>
    <div class="settings">
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p class="class-choice-name" style="width: 50px;"> Class: </p>
            <select class="class-choice">
            </select>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p class="show-choice-name" style="width: 50px;"> Sort: </p>
            <select class="show-choice">
            </select>

            <p class="class-start-time-name"> Period start: </p>
            <input class="class-start-time" type="time"/>
        </div>
    </div>
    <div class="list-container">
        <ul class="list-students">
        </ul>
    </div>
    <button class="save-button hover-state">Export</button>
</div>
<div role="separator" class="kCtYwe kyoOSe"></div>
`;


const editHTML = `
<div id="card2"        
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        " 
    class="card">
    <div class="background-shadow"></div>
    <div class="show-block-2">
        <h2 class="name-2"> Select Class </h2>
        <div class="separator"></div>
        <select class="choose-2" size="6">
        </select>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Edit" class="hover-state">Edit</button>
        </div>
    </div> 
</div>`;


const deleteHTML = `
<div id="card3"        
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        " 
    class="card">
    <div class="background-shadow"></div>
    <div class="show-block-2">
        <h2 class="name-2"> Select Class </h2>
        <div class="separator"></div>
        <select class="choose-2" size="6">
        </select>
        <div class="separator"></div>
        <div class="buttons">
            <button class="Cancel hover-state">Cancel</button>
            <button id="Delete" class="hover-state">Delete</button>
        </div>
    </div> 
</div>`



const attendanceButtonHTML = `
<div id="attendance-button">
    <div class="circle">
        <i class="fal fa-clipboard-user"></i>
    </div>
</div>
`;
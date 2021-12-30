const cardHTML = `<div 
    id="card1"
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        "
    >
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="background-shadow"></div>
    <div class="show-block">
        <h2 class="new-class-name"> New Class </h2>
        <div class="separator"></div>
        <div style="display: flex; flex-direction: row; align-items: center; margin: 0 0.5em;">
            <p> Class name </p>
            <input class="class-name"/>
        </div>
        <p class="student-names" style="width: auto;"> Student names </p>
        <div class="tag-container">
            <input id="tag-input"/>
        </div>
        <button id="ICP"> Inject all current participants </button>
        <div class="separator"></div>
        <div class="buttons">
            <button id="Cancel">Cancel</button>
            <button id="Ok">Save</button>
        </div>
    </div>
</div>`;

const cardHTML2 = `
<div class="container">
    <h4 class="isOLae" style="padding-left: 0px;">Attendance</h4>
    <div class="settings">
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p style="width: 50px;"> Class: </p>
            <select class="class-choice">
            </select>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center;">
            <p style="width: 50px;"> Display: </p>
            <select class="show-choice">
                <option>All</option>
                <option>Early 🟢</option>
                <option>Late 🟡</option>
                <option>Gone 🔴</option>
            </select>

            <p> Period start: </p>
            <input class="class-start-time" type="time"/>
        </div>
    </div>
    <div class="list-container">
        <ul class="list-students">
        </ul>
    </div>
    <button class="save-button">Export</button>
</div>
<div role="separator" class="kCtYwe kyoOSe"></div>
`;


const cardHTML3 = `
<div id="card2"        
    style="
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        ">
    <div class="background-shadow"></div>
    <div class="show-block-2">
        <h2 class="name-2"> Select Class </h2>
        <div class="separator"></div>
        <select class="choose-2" size="6">
        </select>
        <div class="separator"></div>
        <div class="buttons">
            <button id="Cancel-2">Cancel</button>
            <button id="Okay-2"></button>
        </div>
    </div> 
</div>`;
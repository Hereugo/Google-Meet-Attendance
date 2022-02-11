const addClassCardHTML = `
<card id="add-class-card" class="card-container">
    <div class="background-shadow"></div>

    <div class="card">
        <header>
            <h2 class="card-title" data-translate="add-card-title">New Class</h2>

            <button id="add-class-close" class="close-button">
                <i class="material-icons">close</i>
            </button>
        </header>

        <div class="separator"></div>

        <main>
            <div class="input-field">
                <label class="label-text" for="class-name" data-translate="add-class-name">Class Name: </label>
                <input id="class-name" type="text"/>
            </div>
        
            <div class="tags-input-field">
                <label class="label-text" for="tag-container" data-translate="add-tag-container-label">Student Names</label>
                <div id="tag-container"> <input id="tag-input"/> </div>
            </div>

            <button class="add-all-students-button button" style="width: 100%;">
                <i class="material-icons">add</i>
                <span data-translate="add-all-students">Add All Students</span>
            </button>

            <div class="separator"></div>

            <div class="action-buttons-container">
                <button class="cancel-button button" data-translate="cancel-button">Cancel</button>
                <button class="add-button button" style="margin-left: 1em;" data-translate="add-button">Add</button>
            </div>
        </main>
    </div>
</card>`;

const editClassCardHTML = `
<card id="edit-class-card" class="card-container">
    <div class="background-shadow"></div>

    <div class="card" style="width: 25%; max-height: 50%;">
        <header>
            <h2 class="card-title" data-translate="select-card-title">Select Class</h2>

            <button id="add-class-close" class="close-button">
                <i class="material-icons">close</i>
            </button>
        </header>

        <div class="separator"></div>

        <main>
            <select class="select-class" size="6">
            </select>

            <div class="separator"></div>

            <div class="action-buttons-container">
                <button class="cancel-button button" data-translate="cancel-button">Cancel</button>
                <button class="edit-button button" style="margin-left: 1em;" data-translate="edit-button">Edit</button>
            </div>
        </main>
    </div> 
</card>`;

const deleteClassCardHTML = `
<card id="delete-class-card" class="card-container">
    <div class="background-shadow"></div>

    <div class="card" style="width: 25%; max-height: 50%;">
        <header>
            <h2 class="card-title" data-translate="select-card-title">Select Class</h2>

            <button id="add-class-close" class="close-button">
                <i class="material-icons">close</i>
            </button>
        </header>

        <div class="separator"></div>

        <main>
            <select class="select-class" size="6">
            </select>

            <div class="separator"></div>

            <div class="action-buttons-container">
                <button class="cancel-button button" data-translate="cancel-button">Cancel</button>
                <button class="delete-button button" style="margin-left: 1em;" data-translate="delete-button">Delete</button>
            </div>                    
        </main>
    </div>
</card>`

const materialIconHTML = '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>'


const buttonNavHTML = `
<div id="settings-nav-button" class="r6xAKc">
    <span data-is-tooltip-wrapper="true">
        <button class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;mlnRJb:fLiPzd" jsname="A5il2e" data-disable-idom="true" aria-label="Информация о встрече" data-tooltip-enabled="true" data-tooltip-id="tt-c10" aria-pressed="false" style="--mdc-ripple-fg-size:28px; --mdc-ripple-fg-scale:1.71429; --mdc-ripple-left:10px; --mdc-ripple-top:10px;">
            <div jsname="s3Eaab" class="VfPpkd-Bz112c-Jh9lGc"></div>
            <div class="VfPpkd-Bz112c-J1Ukfc-LhBDec"></div>
            <i class="google-material-icons VfPpkd-kBDsod NtU4hc" aria-hidden="true">history_edu</i>
            <i class="google-material-icons VfPpkd-kBDsod Mwv9k" aria-hidden="true">history_edu</i>
        </button>
        <div class="EY8ABd-OWXEXe-TAWMXe" role="tooltip" aria-hidden="true" id="tt-c10"></div>
    </span>
</div>`;

const settingsCardHTML = `
<card id="class-settings-card" class="card-container">
    <div class="background-shadow"></div>

    <div class="card" style="width: 30%; max-height: 50%;">
        <header>
            <h2 class="card-title" data-translate="settings-card-title">Class Settings</h2>

            <button id="add-class-close" class="close-button">
                <i class="material-icons">close</i>
            </button>
        </header>

        <div class="separator"></div>

        <main>
            <div class="class-settings-button-container">
                <button class="add-button button" data-translate="add-button">New Class</button>
                <button class="edit-button button" data-translate="edit-button">Edit Class</button>
                <button class="delete-button button" data-translate="delete-button">Delete Class</button>
            </div>

            <div class="separator"></div>

            <select id="language-select" class="language-select">
                <option value="en">English</option>
                <option value="ru">Russian</option>
            </select>
        </main>
    </div>
</card>
`;
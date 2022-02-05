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
                <label for="class-name" data-translate="add-class-name">Class Name</label>
                <input id="class-name" type="text"/>
            </div>
        
            <div class="tags-input-field">
                <label for="tag-container" data-translate="add-tag-container-label">Student Names</label>
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
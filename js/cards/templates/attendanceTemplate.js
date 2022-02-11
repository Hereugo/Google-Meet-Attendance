const attendanceHTML = `
<div id="attendance-container">
    <header>
        <h4 class="isOLae card-title" style="padding: 0px; margin-bottom: 4px;" data-translate="attendance-card-title">Attendance</h4>
    </header>
    <main>
        <div class="no-class-message" data-translate="no-class-message">Classes are empty, create a new class</div>
        <div class="attendance-content">
            <div class="container">
                <div class="name">
                    <i class="material-icons">school</i>
                    <label for="class-list" data-translate="attendance-class-list">Class:</label>
                </div>
                <select id="class-list">
                </select>
            </div>

            <div class="container">
                <div class="name">
                    <i class="material-icons">filter_list</i>
                    <label for="filter-list" data-translate="attendance-filter-list">Filter:</label>
                </div>
                <select id="filter-list">
                    <option value="🟢🟡🔴" data-translate="attendance-select-filter-all">All</option>
                    <option value="🟢" data-translate="attendance-select-filter-early">Early 🟢</option>
                    <option value="🟡" data-translate="attendance-select-filter-late">Late 🟡</option>
                    <option value="🔴" data-translate="attendance-select-filter-gone">Gone 🔴</option>
                </select>
            </div>

            <div class="container">
                <div class="name">
                    <i class="material-icons">schedule</i>
                    <label for="period-time" data-translate="period-time">Period:</label>
                </div>
                <input id="period-time" type="time" placeholder="00:00"/>
            </div>

            <ul class="student-attendance-list">
            </ul>
            
            <button class="export-button button">
                <i class="material-icons">file_download</i>
                <div data-translate="export-button"> Export as CSV</div>
            </button>
        </div>
    </main>
</div>
<div role="separator" class="kCtYwe kyoOSe"></div>
`;

const studentHTML = `
<li class="student-attendance-list-item" id="{0}" type="{1}" time="{2}" name="{3}">
    <button id="{0}">{1}</button>
    <p>{3}</p>
</li>
`;

const fileHTML = `
<a href="data:text/csv;charset=utf-8,{0}" download="{1}" style="display:none;" target="_blank"></a>
`;
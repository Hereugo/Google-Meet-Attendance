const attendanceHTML = `
<div id="attendance-container">
    <header>
        <h4 class="isOLae card-title" style="padding-left: 0px;" data-translate="attendance-card-title">Attendance</h4>
    </header>
    <main>
        <div class="settings">
            <div class="class-list-container">
                <label for="class-list" data-translate="attendance-class-list">Class:</label>
                <select id="class-list">
                </select>
            </div>

            <div class="filter-list-container">
                <label for="filter-list" data-translate="attendance-filter-list">Filter:</label>
                <select id="filter-list">
                    <option value="🟢🟡🔴" data-translate="attendance-select-filter-all">All</option>
                    <option value="🟢" data-translate="attendance-select-filter-early">Early 🟢</option>
                    <option value="🟡" data-translate="attendance-select-filter-late">Late 🟡</option>
                    <option value="🔴" data-translate="attendance-select-filter-gone">Gone 🔴</option>
                </select>
            </div>
        </div>
        
        <div class="time-container" style="margin-left: auto;">
            <label for="period-time" data-translate="period-time">Period:</label>
            <input id="period-time" type="time" placeholder="00:00"/>
        </div>

        <ul class="student-attendance-list">
        </ul>
        
        <div class="action-buttons-container">
            <button class="export-button button" data-translate="export-button">Export</button>
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
`

const fileHTML = `
<a href="data:text/csv;charset=utf-8,{0}" download="{1}" style="display:none;" target="_blank"></a>
`
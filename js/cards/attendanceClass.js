class Attendance {
    constructor() {
        this.html = attendanceHTML;
        this.id = "attendance-container";
        
        this.setup();
    }

    setup() {
        // Second since we are prepending a new setting button
        $('.r6xAKc:nth(2)').on('click', (() => {
            onReady('.crqnQb', '.ggUFBf', this.injectHTML.bind(this));
        }).bind(this));
    }

    init() {    
        this.$container = $("#" + this.id);

        this.$filterList = this.$container.find('#filter-list');
        this.$periodTime = this.$container.find('#period-time');
        this.$classList = this.$container.find('#class-list');
        this.$attendanceList = this.$container.find('.student-attendance-list');
    }

    async injectHTML() {
        await sleep(100);

        const $parent = $('.ggUFBf');

        $parent.prepend(this.html);

        this.init();

        this.clearAll();
        
        this.$container.find('.export-button').click(this.exportAttendance.bind(this));
        this.$periodTime.change(this.updateAttendanceList.bind(this));
        this.$filterList.change(this.updateAttendanceList.bind(this));
        this.$classList.change(this.updateAttendanceList.bind(this));

        await this.open();
    }

    async open() {
        await this.translate();

        await this.setState();
    }

    async setState() {
        let {classes, selectedClassID, selectedFilterID, selectedPeriod} = await getStorageData(['classes', 'selectedClassID', 'selectedFilterID', 'selectedPeriod']);

        if (classes.length == 0) { // Class is empty
            this.$container.find('.no-class-message').css({display: 'block'});
            this.$container.find('.attendance-content').css({display: 'none'});

            return;
        } else {
            this.$container.find('.no-class-message').css({display: 'none'});
            this.$container.find('.attendance-content').css({display: 'block'});
        }

        let firstClassId = classes[0] ? classes[0].id : "";
        classes.forEach(((cls) => {
            var option = `<option value="${cls.id}">${cls.name}</option>`;
            this.$classList.append(option);
        }).bind(this));
        
        this.$classList.find(`option[value="${selectedClassID || firstClassId}"]`).attr('selected', true);
        this.$filterList.find(`option[value="${selectedFilterID}"]`).attr('selected', true);
        this.$periodTime.val(selectedPeriod);

        await this.updateAttendanceList();
    }

    async updateAttendanceList() {
        let selectedClassID = this.$classList.find(':selected').val();
        let selectedFilterID = this.$filterList.find(':selected').val();
        let selectedPeriod = this.$periodTime.val();

        await setStorageData({
            'selectedClassID': selectedClassID,
            'selectedFilterID': selectedFilterID,
            'selectedPeriod': selectedPeriod
        });

        this.clearAttendance();

        let participants = JSON.parse(sessionStorage.getItem('joined'));
        let {classes} = await getStorageData(['classes']);

        let selectedClass = classes.find(cls => cls.id == selectedClassID);
        
        let attendance = [];
        selectedClass.students.forEach(student => {
            let studentArrivalTime = participants[student.name];
            let type;

            if (studentArrivalTime) {
                if (toMinutes(studentArrivalTime) <= toMinutes(selectedPeriod))
                    type = '🟢'; // Early
                else
                    type = '🟡'; // Late
            } else {
                type = '🔴'; // Gone
            }

            student.type = student.overwritten ? student.type : type;
        
            let $student = $(studentHTML.format(student.id, student.type, student.time, student.name));

            $student.find(`button`).click((async (e) => {
                let btn = $(e.target);
                let {classes, selectedClassID} = await getStorageData(['classes', 'selectedClassID']);

                let selectedClass = classes.find(cls => cls.id == selectedClassID);
                let student = selectedClass.students.find(sdt => sdt.id == btn.attr('id'));

                student.type = ['🔴', '🟢', '🟡', '🔴'].find((_type, i, arr) => student.type == arr[i + 1]);
                student.overwritten = true;

                await setStorageData({'classes': classes});

                await this.updateAttendanceList();
            }).bind(this));

            attendance.push({
                'type': student.type,
                '$student': $student,
            });
        });

        attendance.sort((a, b) => {
            if (a.type == '🔴') return 1;
            if (b.type == '🔴') return -1;
            if (a.type == '🟢') return -1;
            if (b.type == '🟢') return 1;
            return 0;
        });

        attendance.forEach(studentObj => {
            if (selectedFilterID.includes(studentObj.type))
                this.$attendanceList.append(studentObj.$student);
        });

        await setStorageData({'classes': classes});
    }


    async exportAttendance() {
        let {classes, selectedClassID} = await getStorageData(['classes', 'selectedClassID']);
        let selectedClass = classes.find(cls => cls.id == selectedClassID);

        let studentArr = selectedClass.students.map(student => {
            return {
                'name': student.name || "No name",
                'type': student.type == "🟢" ? "Early": student.type == "🟡" ? "Late": "Abscent",
                'time': student.time || "--:--",
            };
        });


        let csvStr = arrToCSV(studentArr, ['name', 'type', 'time']);

        downloadFile(selectedClass.name, csvStr);
    }

    async translate() {
        let {language} = await getStorageData(['language']);

        this.$container.find('[data-translate]').each(function() {
            let $this = $(this);

            let key = $this.attr('data-translate');
            let translation = translations[language][key];

            $this.text(translation);
        });
    }

    clearAll() {
        this.$classList.empty();
        this.clearAttendance();
    }

    clearAttendance() {
        this.$attendanceList.empty();
    }
}
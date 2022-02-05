class Card {
    // TODO: find a better place to add these functions
    clear() {
        this.$select.empty();
    }
    async open() {
        await this.translate();
        
        await this.setState();        
        
        this.show();
    }
    async setState() {
        this.clear();

        let {classes} = await getStorageData(['classes']);

        classes.forEach(cls => {
            var option = `<option value="${cls.id}">${cls.name}</option>`;
            this.$select.append(option);
        });

        this.$select.prop({"selectedIndex": 0});
    }


    injectHTML($parent) {
        $parent.append(this.html);
    }

    show() {
        this.$card.css({visibility: 'visible'});
    }
    hide() {
        this.$card.css({visibility: 'hidden'});
    }

    getNewId(prefix) {
        return Math.random().toString(36).replace('0.',prefix || '');
    }

    async translate() {
        let {language} = await getStorageData(['language']);

        this.$card.find('[data-translate]').each(() => {
            let $this = $(this);

            let key = $this.attr('data-translate');
            let translation = translations[language][key];

            $this.text(translation);
        });
    }
}

class AddClassCard extends Card {
    constructor($parent) {
        super();

        this.html = addClassCardHTML;
        this.injectHTML($parent);

        this.id = "add-class-card";
        this.$card = $("#" + this.id);
        this.$className = this.$card.find('#class-name');
        this.currentClassID = "";

        this.tagContainer = new Tags(this.$card);

        this.init();
    }

    clear() {
    	this.tagContainer.clearAll();
        this.$className.val("");
    }

    async open(classID = "") {
        await this.translate();
        await this.setState(classID);

        this.show();
    }
    async setState(classID) {
        this.currentClassID = classID;

        if (classID == "") {
            this.clear();
        } else {
            let {classes} = await getStorageData(['classes']);
            let classInfo = classes.find(cls => cls.id == classID);
            let students = classInfo.students;

            this.$className.val(classInfo.name);
            this.tagContainer.addTags(students.map(student => student.name));
        }
    }

    init() {
        // https://stackoverflow.com/questions/55755731/get-variable-of-class-inside-onclick-function
        this.$card.find('.add-button').click(this.save.bind(this));
        this.$card.find('.cancel-button').click(this.hide.bind(this));
        this.$card.find('.add-all-students-button').click(this.addAllStudents.bind(this));
    }


    async save() {
        let className = this.$className.val();
        let students = this.tagContainer.getTags().map((tag => { return {
            'id': this.getNewId('student-'),
            'name': tag,
            'type': "", // Either 🔴, 🟡 or 🟢
            'overwritten': false
        }}).bind(this));
        let {classes} = await getStorageData(['classes']);

        if (this.currentClassID != "") {
            classes = classes.map((cls => {
                if (cls.id == this.currentClassID) {
                    cls.name = className;
                    cls.students = students;
                }
                return cls;
            }).bind(this));
        } else {
            this.currentClassID = this.getNewId("class-");
            classes.push({
                "id": this.currentClassID,
                "name": className,
                "students": students
            });
        }

        await setStorageData({'classes': classes});

        this.clear();
        this.hide();
    }

    addAllStudents() {
        let joinedStudents = JSON.parse(sessionStorage.getItem('joined'));

        for (let name in joinedStudents) {
            if (this.tagContainer.getTags().indexOf(name) == -1) {
                this.tagContainer.addTag(name);
            }
        }
    }
}

class EditClassCard extends Card {
    constructor($parent) {
        super();

        this.html = editClassCardHTML;
        this.injectHTML($parent);

        this.id = "edit-class-card";
        this.$card = $("#" + this.id);
        this.$select = this.$card.find('.select-class');

        this.init();
    }

    init() {
        this.$card.find('.cancel-button').click(this.hide.bind(this));
        this.$card.find(".edit-button").click(this.edit.bind(this));
    }

    async edit() {
        let choosenClassID = this.$select.find(":selected").val();
        
        await addClassCard.open(choosenClassID);
        
        this.hide();
    }
}

class DeleteClassCard extends Card {
    constructor($parent) {
        super();

        this.html = deleteClassCardHTML;
        this.injectHTML($parent);
        
        this.id = "delete-class-card";
        this.$card = $("#" + this.id);
        this.$select = this.$card.find('.select-class');

        this.init();
    }

    init() {
        this.$card.find('.cancel-button').click(this.hide.bind(this));
        this.$card.find(".delete-button").click(this.delete.bind(this));
    }

    async delete() {
        let choosenClassID = this.$select.find(":selected").val();

        let {classes} = await getStorageData(['classes']);
        classes = classes.filter(cls => cls.id != choosenClassID);

        await setStorageData({'classes': classes});
        
        this.hide();
    }
}
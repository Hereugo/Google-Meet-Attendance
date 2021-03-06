var meetLanguage = {
	en: {
		popup: {
			popup_name: 'Class',
			popup_add_class: 'Add Class',
			popup_edit_class: 'Edit Class',
			popup_del_class: 'Delete Class',
			language: 'Language',
		},
		cardHTML: {
			new_class_name: 'New Class',
			input_name_class_name: 'Class name',
			student_names: 'Student names',
			ICP: 'Add all current students', // ICP - "Inject current participants"
			Cancel: 'Cancel',
			Ok: 'Save',
		},
		cardHTML2: {
			card_title_2: 'Attendance',
			class_choice_name: 'Class:',
			show_choice_name: 'Sort:',
			show_choice: ['All', 'Early 🟢', 'Late 🟡', 'Gone 🔴'],
			class_start_time_name: 'Period start:',
			save_button: 'Export',
		},
		cardHTML3: {
			name_2: 'Select Class',
			Cancel_2: 'Cancel',
		}
	},
	ru: {
		popup: {
			popup_name: 'Класс',
			popup_add_class: 'Добавить Класс',
			popup_edit_class: 'Изменить Класс',
			popup_del_class: 'Удалить Класс',
			language: 'Язык',
		},
		cardHTML: {
			new_class_name: 'Новый Класс',
			input_name_class_name: 'Имя класса',
			student_names: 'Имя участников',
			ICP: 'Добавить всех нынешних учеников',
			Cancel: 'Отменить',
			Ok: 'Сохранить',
		},
		cardHTML2: {
			card_title_2: 'Посещаемость',
			class_choice_name: 'Класс:',
			show_choice_name: 'Показ:',
			show_choice: ['Всех', 'Ранних 🟢', 'Поздних 🟡', 'Ушедший 🔴'],
			class_start_time_name: 'Время:',
			save_button: 'Сохранить',
		},
		cardHTML3: {
			name_2: 'Выберите Класс',
			Cancel_2: 'Отменить',
		}
	}
}

function updateCard1() {
    document.querySelector('.new-class-name').innerText = meetLanguage[lastSeenLang]['cardHTML']['new_class_name'];
    document.querySelector('.input-name-class-name').innerText = meetLanguage[lastSeenLang]['cardHTML']['input_name_class_name'];
    document.querySelector('.student-names').innerText = meetLanguage[lastSeenLang]['cardHTML']['student_names'];
    document.querySelector('#ICP').innerText = meetLanguage[lastSeenLang]['cardHTML']['ICP'];
    document.querySelector('#Cancel').innerText = meetLanguage[lastSeenLang]['cardHTML']['Cancel'];
    document.querySelector('#Ok').innerText = meetLanguage[lastSeenLang]['cardHTML']['Ok'];
}
function updateCard2(str) {
    document.querySelector('.name-2').innerText = meetLanguage[lastSeenLang]['cardHTML3']['name_2'];
    document.querySelector('#Cancel-2').innerText = meetLanguage[lastSeenLang]['cardHTML3']['Cancel_2'];
    if (str == "Edit")
        document.getElementById('Okay-2').innerText = (lastSeenLang == 'en')?"Edit":"Изменить";
    else
        document.getElementById('Okay-2').innerText = (lastSeenLang == 'en')?"Delete":"Удалить";
}

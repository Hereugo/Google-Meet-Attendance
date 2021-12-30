const meetLanguage = {
	en: {
		popup: {
			popup_name: 'Class',
			popup_add_class: 'Add Class',
			popup_edit_class: 'Edit Class',
			popup_del_class: 'Delete Class',
			language: 'Language',
			link: 'https://www.youtube.com/watch?v=xhnKGd76ZOg',
		},
		classHTML: {
			new_class_name: 'New Class',
			input_name_class_name: 'Class name',
			student_names: 'Student names',
			ICP: 'Add all current students', // ICP - "Inject current participants"
			Cancel: 'Cancel',
			Ok: 'Save',
		},
		attendanceHTML: {
			card_title_2: 'Attendance',
			class_choice_name: 'Class:',
			show_choice_name: 'Sort:',
			show_choice: ['All', 'Early 🟢', 'Late 🟡', 'Gone 🔴'],
			class_start_time_name: 'Period start:',
			save_button: 'Export',
		},
		updateHTML: {
			name_2: 'Select Class',
			Cancel_2: 'Cancel',
			Edit: 'Edit',
			Delete: 'Delete'
		}
	},
	ru: {
		popup: {
			popup_name: 'Класс',
			popup_add_class: 'Добавить Класс',
			popup_edit_class: 'Изменить Класс',
			popup_del_class: 'Удалить Класс',
			language: 'Язык',
			link: 'https://www.youtube.com/watch?v=VyXnD_9f6Kg'
		},
		classHTML: {
			new_class_name: 'Новый Класс',
			input_name_class_name: 'Имя класса',
			student_names: 'Имя участников',
			ICP: 'Добавить всех нынешних учеников',
			Cancel: 'Отменить',
			Ok: 'Сохранить',
		},
		attendanceHTML: {
			card_title_2: 'Посещаемость',
			class_choice_name: 'Класс:',
			show_choice_name: 'Показ:',
			show_choice: ['Всех', 'Ранних 🟢', 'Поздних 🟡', 'Ушедший 🔴'],
			class_start_time_name: 'Время:',
			save_button: 'Сохранить',
		},
		updateHTML: {
			name_2: 'Выберите Класс',
			Cancel: 'Отменить',
			Edit: 'Изменить',
			Delete: 'Удалить',
		}
	}
}
function updateCards() {
	chrome.storage.sync.get(['lang'], function(request) {
		document.querySelector('.new-class-name').innerText = meetLanguage[request.lang]['classHTML']['new_class_name'];
		document.querySelector('.input-name-class-name').innerText = meetLanguage[request.lang]['classHTML']['input_name_class_name'];
		document.querySelector('.student-names').innerText = meetLanguage[request.lang]['classHTML']['student_names'];
		document.querySelector('#ICP').innerText = meetLanguage[request.lang]['classHTML']['ICP'];
		document.querySelector('#Ok').innerText = meetLanguage[request.lang]['classHTML']['Ok'];


		document.querySelectorAll('.Cancel').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['classHTML']['Cancel'];
		});

		document.querySelectorAll('.name-2').forEach((element)=>{
			element.innerText = meetLanguage[request.lang]['updateHTML']['name_2'];
		});

		document.querySelector('#Edit').innerText = meetLanguage[request.lang]['updateHTML']['Edit'];
	    document.querySelector('#Delete').innerText = meetLanguage[request.lang]['updateHTML']['Delete'];
	});
}

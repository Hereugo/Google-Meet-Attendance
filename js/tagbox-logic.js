var tags = [];

function createTag(label) {
	const div = document.createElement('div');
	div.setAttribute('class', 'tag');
	const span = document.createElement('span');
	span.innerHTML = label;
	const closeIcon = document.createElement('i');
	closeIcon.innerHTML = 'close';
	closeIcon.setAttribute('class', 'material-icons');
	closeIcon.setAttribute('data-item', label);
	div.appendChild(span);
	div.appendChild(closeIcon);
	return div;
}

function clearTags() {
	document.querySelectorAll('.tag').forEach(tag => {
		tag.parentElement.removeChild(tag);
	});
}

function addTags() {
	clearTags();
	tags.slice().reverse().forEach(tag => {
		document.querySelector('.tag-container').prepend(createTag(tag));
	});
}

function addNewTag(e) {
    if (e.key === 'Enter') {
		e.target.value.split(',').forEach(tag => {
			tags.push(tag);  
		});
		addTags();
		document.querySelector('#tag-input').value = '';
    }
}

function deleteTagCheck(e) {
	if (e.target.tagName === 'I') {
		const tagLabel = e.target.getAttribute('data-item');
		const index = tags.indexOf(tagLabel);
		tags = [...tags.slice(0, index), ...tags.slice(index+1)];
		addTags();    
	}
}

function focusOnInput() {
	document.querySelector('#tag-input').focus();
}
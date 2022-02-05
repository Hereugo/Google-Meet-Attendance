class Tags {
	constructor($parent) {
		this.tags = [];

		this.tagInput = $parent.find('#tag-input');
		this.tagContainer = $parent.find('#tag-container');

		this.init();
	}

	init() {
		this.tagInput.keyup(this.addNewTag.bind(this));
		this.tagContainer.click(this.setFocus.bind(this));

		this.clearAll();
	}

	clearContainer() {
		this.tagContainer.find('.tag').remove();
	}

	clearAll() {
		this.clearContainer();
		this.tagInput.val('');
		this.tags = [];
	}

	createTag(label) {
		var $html = $(`
		<div class="tag">
			<span class="tag-label">${label}</span>
			<i class="material-icons tag-remove" data-item=${label}>close</i>
		</div>`);

		$html.find('.tag-remove').click(this.removeTag.bind(this));

		return $html;
	}

	updateContainer() {
		this.clearContainer();

		// Reverse the copy of tags and then prepend 
		// because one of the children is tag-input that should be always last
		[...this.tags].reverse().forEach(tag => {
			this.tagContainer.prepend(this.createTag(tag));
		});
	}

	addTags(tags = []) {
		this.tags = [...this.tags, ...tags]; // Concatenate arrays
		console.log(this.tags)
		this.updateContainer();
	}

	addNewTag(e) {
		if (e.key === 'Enter') {
			this.addTags(e.target.value.split(','));

			this.tagInput.val('');
		}
	}

	removeTag(e) {
		var $tag = $(e.target);
		var tagLabel = $tag.attr('data-item');

		const index = this.tags.indexOf(tagLabel);
		this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index+1)];
		
		this.updateContainer();
	}

	getTags() {
		return this.tags;
	}

	setFocus() {
		this.tagInput.focus();
	}
}
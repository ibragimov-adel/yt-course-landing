const ACTIVE_MODULE_CONTENT_CLASS = 'modules__content-wrapper_active';
const ACTIVE_MODULE_CONTROL_CLASS = 'modules__nav-item_active';

document.addEventListener('DOMContentLoaded', () => {
	let currentModule = '01';
	const modulesControls = document.querySelectorAll('.modules__nav-item');
	const modulesContents = document.querySelectorAll('.modules__content-wrapper');

	modulesControls.forEach(elem => elem.addEventListener('click', () => {
		const targetID = elem.id.split('-')[2];

		const currentContent = document.querySelector(`#module-content-${currentModule}`);
		const targetContent = document.querySelector(`#module-content-${targetID}`);
		const currentControl = document.querySelector(`#module-nav-${currentModule}`);
		const targetControl = document.querySelector(`#module-nav-${targetID}`);

		currentContent.classList.remove(ACTIVE_MODULE_CONTENT_CLASS);
		currentControl.classList.remove(ACTIVE_MODULE_CONTROL_CLASS);
		targetContent.classList.add(ACTIVE_MODULE_CONTENT_CLASS);
		targetControl.classList.add(ACTIVE_MODULE_CONTROL_CLASS);

		currentModule = targetID;
	}));
});

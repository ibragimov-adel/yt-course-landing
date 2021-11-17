const ACTIVE_MODULE_CONTENT_CLASS = 'modules__content-wrapper_active';
const ACTIVE_MODULE_CONTROL_CLASS = 'modules__nav-item_active';

const ACTIVE_MODAL_OVERLAY_CLASS = 'modals__overlay_opened';
const ACTIVE_MODAL_CLASS = 'modal_opened';

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#year').textContent = new Date().getFullYear();

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

	const modalOverlay = document.querySelector('.modals__overlay');
	let activeModal;

	document.querySelectorAll('[data-control=modal]').forEach((elem) => {
		const targetID = elem.dataset.target;

		elem.addEventListener('click', () => {
			activeModal = document.querySelector(`#${targetID}`);

			if (elem.dataset.video) {
				const iframe = activeModal.querySelector('iframe');
				iframe.src = 'https://youtube.com/embed/' + elem.dataset.video;
			}

			modalOverlay.classList.add(ACTIVE_MODAL_OVERLAY_CLASS);
			activeModal.classList.add(ACTIVE_MODAL_CLASS);
		});
	});

	modalOverlay.addEventListener('click', () => {
		modalOverlay.classList.remove(ACTIVE_MODAL_OVERLAY_CLASS);
		activeModal.classList.remove(ACTIVE_MODAL_CLASS);
	});

	document.querySelectorAll('.modal').forEach(elem => {
		elem.addEventListener('click', e => e.stopPropagation());
	});

	document.querySelectorAll('[data-target=tinkoff]').forEach(elem => {
		const item = elem.dataset.item;
		const sum = parseInt(elem.dataset.sum);

		elem.addEventListener('click', () => {
			window.tinkoff.create({
				shopId: '325d2b43-5c1a-489d-b21c-8d85e447a9ec',
				showcaseId: '60dd7f4c-7f2c-4c21-8aef-c95c8b361947',
				sum: sum,
				items: [
					{
						name: item,
						quantity: 1,
						price: sum
					}
				]
			}, {
				view: 'modal'
			});
		});
	});
});

import './index.html';
import './index.scss';
import {deleteControl, formControl, modalControl} from './modules/control.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import * as storage from './modules/serviceStorage.js';

const init = (selectorApp, title) => {
	const hoverRow = (allRow, logo) => {
		const text = logo.textContent;
		allRow.forEach(contact => {
			contact.addEventListener('mouseenter', () => {
				logo.textContent = contact.phoneLink.textContent;
			});
		});
		allRow.forEach(contact => {
			contact.addEventListener('mouseleave', () => {
				logo.textContent = text;
			});
		});
	};

	const app = document.querySelector(selectorApp);

	const {
		list,
		btnAdd,
		logo,
		formOverlay,
		form,
		btnDel,
	} = renderPhoneBook(app, title);

	// Functional

	const allRow = renderContacts(list, storage.getStorage('key'));
	const {closeModal} = modalControl(btnAdd, formOverlay);

	deleteControl(btnDel, list);
	formControl(form, list, closeModal);
	hoverRow(allRow, logo);
	const clearList = () => {
		const contacts = document.querySelectorAll('.contact');
		contacts.forEach(e => e.remove());
	};

	const firstName = document.querySelector('.firstname');
	const surname = document.querySelector('.surname');
	const sortArray = (data, field) => {
		data.sort((prev, next) => {
			if (prev[field].toLowerCase() < next[field].toLowerCase()) return -1;
			if (prev[field].toLowerCase() > next[field].toLowerCase()) return 1;
			return 0;
		});
		hoverRow(allRow, logo);
		localStorage.setItem('key', JSON.stringify(data));
		return data;
	};

	firstName.addEventListener('click', (e) => {
		const data = storage.getStorage('key');
		const target = e.target;
		if (target.closest('.firstname')) {
			clearList();
			renderContacts(list, sortArray(data, 'name'));
		}
	});

	surname.addEventListener('click', (e) => {
		const data = storage.getStorage('key');
		const target = e.target;
		if (target.closest('.surname')) {
			clearList();
			renderContacts(list, sortArray(data, 'surname'));
		}
	});
};
window.phoneBookInit = init;

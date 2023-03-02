import {deleteControl, formControl, hoverRow,
	modalControl} from './modules/control.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import * as storage from './modules/serviceStorage.js';
import {sortList} from './modules/sort.js';

const init = (selectorApp, title) => {
	const app = document.querySelector(selectorApp);

	const {
		list,
		btnAdd,
		logo,
		formOverlay,
		form,
		btnDel,
		table,
	} = renderPhoneBook(app, title);

	const allRow = renderContacts(list, storage.getStorage('key'));
	const {closeModal} = modalControl(btnAdd, formOverlay);
	deleteControl(btnDel, list);
	formControl(form, list, closeModal);
	hoverRow(allRow, logo);
	sortList(list, table);
};
window.phoneBookInit = init;

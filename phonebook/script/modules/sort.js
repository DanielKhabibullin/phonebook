import {clearList, hoverRow} from './control.js';
import {renderContacts} from './render.js';
import {getStorage} from './serviceStorage.js';

const sortArray = (data, field) => {
	data.sort((prev, next) => {
		if (prev[field].toLowerCase() < next[field].toLowerCase()) return -1;
		if (prev[field].toLowerCase() > next[field].toLowerCase()) return 1;
		return 0;
	});
	hoverRow();
	localStorage.setItem('key', JSON.stringify(data));
	return data;
};

export const sortList = (list, table) => {
	const data = getStorage('key');
	table.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('.firstname')) {
			clearList();
			renderContacts(list, sortArray(data, 'name'));
		}
		if (target.closest('.surname')) {
			clearList();
			renderContacts(list, sortArray(data, 'surname'));
		}
	});
};

// const firstName = document.querySelector('.firstname');
// const surname = document.querySelector('.surname');

// firstName.addEventListener('click', (e) => {
// 	const data = getStorage('key');
// 	const target = e.target;
// 	if (target.closest('.firstname')) {
// 		clearList();
// 		renderContacts(list, sortArray(data, 'name'));
// 	}
// });

// surname.addEventListener('click', (e) => {
// 	const data = getStorage('key');
// 	console.log('data: ', data);
// 	const target = e.target;
// 	if (target.closest('.surname')) {
// 		clearList();
// 		renderContacts(list, sortArray(data, 'surname'));
// 	}
// });



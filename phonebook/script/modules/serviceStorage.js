export const getStorage = key => (localStorage.getItem(key) ?
JSON.parse(localStorage.getItem(key)) : []);

export const setStorage = (key, obj) => {
	const data = getStorage('key');
	data.push(obj);
	const contact = JSON.stringify(data);
	localStorage.setItem(key, contact);
};

export const removeStorage = (phone) => {
	const data = getStorage('key');
	// data.forEach((obj, index) => {
	// if (obj.phone === phone) {
	// data.splice(index, 1);
	// }
	// });
	const newData = data.filter(item => item.phone !== phone);
	localStorage.setItem('key', JSON.stringify(newData));
};

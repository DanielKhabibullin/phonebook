export const createContainer = () => {
	const container = document.createElement('div');
	container.classList.add('container');
	return container;
};

export const createHeader = () => {
	const header = document.createElement('header');
	header.classList.add('header');

	const headerContainer = createContainer();

	header.append(headerContainer);

	header.headerContainer = headerContainer;
	return header;
};

export const createLogo = title => {
	const h1 = document.createElement('h1');

	h1.classList.add('logo');
	h1.textContent = `${title}'s phonebook`;
	return h1;
};

export const createMain = () => {
	const main = document.createElement('main');

	const mainContainer = createContainer();
	main.append(mainContainer);

	main.mainContainer = mainContainer;
	return main;
};

export const createButtonsGroup = params => {
	const btnWrapper = document.createElement('div');

	btnWrapper.classList.add('btn-wrapper');

	const btns = params.map(({className, type, text}) => {
		const button = document.createElement('button');
		button.className = className;
		button.type = type;
		button.textContent = text;
		return button;
	});

	btnWrapper.append(...btns);
	return {
		btnWrapper,
		btns,
	};
};

export const createTable = () => {
	const table = document.createElement('table');
	table.classList.add('table', 'table-striped');

	const thead = document.createElement('thead');
	thead.insertAdjacentHTML('beforeend', `
		<tr>
			<th class="delete">Delete</th>
			<th class="firstname">First name</th>
			<th class="surname">Surname</th>
			<th>Phone</th>
		</tr>
	`);

	const tbody = document.createElement('tbody');
	table.append(thead, tbody);

	table.tbody = tbody;
	return table;
};


export const createForm = () => {
	const overlay = document.createElement('div');

	overlay.classList.add('form-overlay');

	const form = document.createElement('form');

	form.classList.add('form');

	form.insertAdjacentHTML('beforeend', `
		<button class="close" type="button"></button>
		<h2 class="form-title">Add contact</h2>
		<div class="form-group">
			<label class="form-label" for="name">First name:</label>
			<input class="form-input" name="name" id="name" type="text" required>
		</div>
		<div class="form-group">
			<label class="form-label" for="surname">Surname:</label>
			<input class="form-input" name="surname" id="surname"
			type="text" required>
		</div>
		<div class="form-group">
			<label class="form-label" for="phone">Phone:</label>
			<input class="form-input" name="phone" id="phone"
			type="tel" required>
		</div>
	`);

	const buttonGroup = createButtonsGroup([
		{
			className: 'btn btn-primary mr-3',
			type: 'submit',
			text: 'Add',
		},
		{
			className: 'btn btn-danger mr-3',
			type: 'reset',
			text: 'Cancel',
		},
	]);

	form.append(...buttonGroup.btns);

	overlay.append(form);

	return {
		overlay,
		form,
	};
};

export const createFooter = title => {
	const footer = document.createElement('footer');
	footer.classList.add('footer');

	const footerContainer = createContainer();

	footer.append(footerContainer);

	footer.footerContainer = footerContainer;

	const rights = document.createElement('span');

	footerContainer.append(rights);

	rights.textContent = `All rights reserved © ${title}`;

	return footer;
};

export const createRow = ({name: firstName, surname, phone}) => {
	const tr = document.createElement('tr');
	tr.classList.add('contact');
	const tdDel = document.createElement('td');
	tdDel.classList.add('delete');
	const buttonDel = document.createElement('button');
	buttonDel.classList.add('del-icon');
	tdDel.append(buttonDel);

	const tdName = document.createElement('td');
	tdName.textContent = firstName;

	const tdSurname = document.createElement('td');
	tdSurname.textContent = surname;

	const tdPhone = document.createElement('td');

	const phoneLink = document.createElement('a');
	phoneLink.href = `tel:${phone}`;
	phoneLink.textContent = phone;
	tr.phoneLink = phoneLink;
	tdPhone.append(phoneLink);

	const buttonRedact = document.createElement('button');
	buttonRedact.textContent = 'redact';
	buttonRedact.classList.add('btn-success');
	buttonRedact.style.borderRadius = '.25rem';
	buttonRedact.style.marginTop = '.6rem';

	tr.append(tdDel, tdName, tdSurname, tdPhone, buttonRedact);

	return tr;
};

export default {
	createRow,
};

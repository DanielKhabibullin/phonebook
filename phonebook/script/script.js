'use strict';

const data = [
	{
		name: 'Ivan',
		surname: 'Petrov',
		phone: '+79514545454',
	},
	{
		name: 'Konstantin',
		surname: 'Semyonov',
		phone: '+79999999999',
	},
	{
		name: 'Semyon',
		surname: 'Ivanov',
		phone: '+79800252525',
	},
	{
		name: 'Maria',
		surname: 'Popova',
		phone: '+79876543210',
	},
];
{
	const addContactData = contact => {
		data.push(contact);
		console.log('data: ', data);
	};

	const createContainer = () => {
		const container = document.createElement('div');
		container.classList.add('container');
		return container;
	};

	const createHeader = () => {
		const header = document.createElement('header');
		header.classList.add('header');

		const headerContainer = createContainer();

		header.append(headerContainer);

		header.headerContainer = headerContainer;
		return header;
	};

	const createLogo = title => {
		const h1 = document.createElement('h1');

		h1.classList.add('logo');
		h1.textContent = `${title}'s phonebook`;
		return h1;
	};

	const createMain = () => {
		const main = document.createElement('main');

		const mainContainer = createContainer();
		main.append(mainContainer);

		main.mainContainer = mainContainer;
		return main;
	};

	const createButtonsGroup = params => {
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

	const createTable = () => {
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


	const createForm = () => {
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

	const createFooter = title => {
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

	const renderPhoneBook = (app, title) => {
		const header = createHeader();
		const logo = createLogo(title);
		const main = createMain();
		const buttonGroup = createButtonsGroup([
			{
				className: 'btn btn-primary mr-3',
				type: 'button',
				text: 'Add',
			},
			{
				className: 'btn btn-danger mr-3',
				type: 'button',
				text: 'Delete',
			},
		]);

		const table = createTable();
		const {form, overlay} = createForm();
		const footer = createFooter(title);

		header.headerContainer.append(logo);

		main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

		app.append(header, main, footer);

		return {
			list: table.tbody,
			logo,
			btnAdd: buttonGroup.btns[0],
			btnDel: buttonGroup.btns[1],
			formOverlay: overlay,
			form,
		};
	};

	const createRow = ({name: firstName, surname, phone}) => {
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

	const renderContacts = (elem, data) => {
		const allRow = data.map(createRow);
		elem.append(...allRow);
		return allRow;
	};

	const hoverRow = (allRow, logo) => {
		const text = logo.textContent;
		allRow.forEach(contact => {
			contact.addEventListener('mouseenter', () => {
				// console.log('mouseEnter', contact);
				logo.textContent = contact.phoneLink.textContent;
			});
		});
		allRow.forEach(contact => {
			contact.addEventListener('mouseleave', () => {
				// console.log('mouseEnter', contact);
				logo.textContent = text;
			});
		});
	};

	const modalControl = (btnAdd, formOverlay) => {
		const openModal = () => {
			formOverlay.classList.add('is-visible');
		};

		const closeModal = () => {
			formOverlay.classList.remove('is-visible');
		};

		btnAdd.addEventListener('click', openModal);

		formOverlay.addEventListener('click', e => {
			const target = e.target;
			if (target === formOverlay || target.classList.contains('close')) {
				closeModal();
			}
		});
		return {
			closeModal,
		};
	};

	const deleteControl = (btnDel, list) => {
		btnDel.addEventListener('click', () => {
			document.querySelectorAll('.delete').forEach(del => {
				del.classList.toggle('is-visible');
			});
		});

		list.addEventListener('click', e => {
			const target = e.target;
			if (target.closest('.del-icon')) {
				target.closest('.contact').remove();
			}
		});
	};

	const addContactPage = (contact, list) => {
		list.append(createRow(contact));
	};

	const formControl = (form, list, closeModal) => {
		form.addEventListener('submit', e => {
			e.preventDefault();
			const formData = new FormData(e.target);
			const newContact = Object.fromEntries(formData);
			console.log('newContact: ', newContact);
			addContactPage(newContact, list);
			addContactData(newContact);
			form.reset();
			closeModal();
		});
	};

	const init = (selectorApp, title) => {
		const app = document.querySelector(selectorApp);

		const {
			list,
			logo,
			btnAdd,
			formOverlay,
			form,
			btnDel,
		} = renderPhoneBook(app, title);

		// Functional
		const allRow = renderContacts(list, data);
		const {closeModal} = modalControl(btnAdd, formOverlay);

		hoverRow(allRow, logo);
		deleteControl(btnDel, list);
		formControl(form, list, closeModal);

		const clearList = () => {
			const contacts = document.querySelectorAll('.contact');
			contacts.forEach(e => e.remove());
		};

		const firstName = document.querySelector('.firstname');
		const surname = document.querySelector('.surname');
		const sortArray = (data, field) => {
			data.sort((prev, next) => {
				if (prev[field] < next[field]) return -1;
				if (prev[field] > next[field]) return 1;
				return 0;
			});
			return data;
		};

		firstName.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest('.firstname')) {
				clearList();
				renderContacts(list, sortArray(data, 'name'));
			}
		});

		surname.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest('.surname')) {
				clearList();
				renderContacts(list, sortArray(data, 'surname'));
			}
		});
	};
	window.phoneBookInit = init;
}

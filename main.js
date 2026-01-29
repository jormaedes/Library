const dialog = document.querySelector(".new-book");
const btnAdd = document.getElementById("btn-add");
const btnAddBook = dialog.querySelector("#add");
const btnCancel = dialog.querySelector("#cancel");
const books = [];

const booksList = document.querySelector('.books-list');
const titleIn = document.querySelector('#book-title');
const authorIn = document.querySelector('#author');
const pagesIn = document.querySelector('#pages');
const isReadIn = document.querySelector('#readed');

function Book(title, author, pages, read)
{
	if (!new.target)
		throw Error("Error: you must call with new operator");
	this.title = title;
	if (author == '')
		author = 'Unknown';
	this.author = author;
	this.pages = pages;
	if (read)
		this.read = 'Read';
	else
		this.read = 'Not read';
}

function addChild(book)
{
	booksList.appendChild(book);
}

function addBookToLibrary()
{
	const book = createBook();
	books.push(book);
	addChild(book);
}

function createBook()
{
	const book = new Book(titleIn.value, authorIn.value, pagesIn.value, isReadIn.checked);
	const uid = crypto.randomUUID();
	const newBook = document.createElement("div");
	const p1 = document.createElement('p');
	const p2 = document.createElement('p');
	const p3 = document.createElement('p');
	const divBtns = document.createElement("div");
	const btnStatus = document.createElement("button");
	const btnRemove = document.createElement("button");
	const iconTrash = document.createElement('i');

	p1.classList.add('title');
	divBtns.classList.add('buttons');
	btnStatus.classList.add('status');
	btnRemove.classList.add('remove-book');
	newBook.classList.add('book');
	newBook.setAttribute('id', uid);
	iconTrash.classList.add('ri-delete-bin-line');

	p1.textContent = book.title;
	p2.textContent = book.author;
	p3.textContent = book.pages;
	if (book.read == 'Read')
		btnStatus.classList.add('read');
	btnStatus.textContent = book.read;
	btnRemove.appendChild(iconTrash);
	divBtns.appendChild(btnStatus);
	divBtns.appendChild(btnRemove);
	newBook.append(p1, p2, p3, divBtns);
	return (newBook);
}

btnAdd.addEventListener("click", () => {
	dialog.showModal();
});

dialog.addEventListener('close', ()=>{
	if (dialog.returnValue === '' || dialog.returnValue === 'cancel')
		return ;
	addBookToLibrary();
});

function erro(){
	const error_t = document.querySelector('#error_title');
	const error_p = document.querySelector('#error_pages');
	if (titleIn.value === '')
		error_t.textContent = "The book must have a title.";
	if (pagesIn.value == '')
		error_p.textContent = "You must have a certain number of pages";
}

btnAddBook.addEventListener('click', (event) => {
	event.preventDefault();
	if (titleIn.value === '' ||
		pagesIn.value == ''
	){
		erro()
		return ;
	}
	dialog.close('sucess');
});

btnCancel.addEventListener('click', (event)=>{
	event.preventDefault();
	dialog.close('cancel');
})

const dialog = document.querySelector(".new-book");
const btnAdd = document.getElementById("btn-add");
const btnAddBook = dialog.querySelector("#add");
const btnCancel = dialog.querySelector("#cancel");
const books = [];
const tb = document.querySelector('.tb-value');
const rb = document.querySelector('.rb-value');
const nrb = document.querySelector('.nrb-value');


const booksList = document.querySelector('.books-list');
const titleIn = document.querySelector('#book-title');
const authorIn = document.querySelector('#author');
const pagesIn = document.querySelector('#pages');
const isReadIn = document.querySelector('#readed');

booksList.addEventListener('click', (e)=>{
	if (e.target.closest('.remove-book')) {
		const book = e.target.closest(".book");
		removeBook(book);
		return;
	}
	if (e.target.closest('.status')) {
		const btnStatus = e.target.closest('.status');
		if (!btnStatus) return;
		if (btnStatus.classList.contains('read')) {
			nrb.textContent = parseInt(nrb.textContent) + 1;
			rb.textContent = parseInt(rb.textContent) - 1;
			btnStatus.textContent = 'Not read';
		} else {
			nrb.textContent = parseInt(nrb.textContent) - 1;
			rb.textContent = parseInt(rb.textContent) + 1;
			btnStatus.textContent = 'Read';
		}
		btnStatus.classList.toggle('read');
	}
});

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
	tb.textContent = parseInt(tb.textContent) + 1;
	if (book.querySelector('.read'))
		rb.textContent = parseInt(rb.textContent) + 1;
	else
		nrb.textContent = parseInt(nrb.textContent) + 1;
	titleIn.parentElement.reset();
	addChild(book);
}

function removeBook(el)
{
	let i = books.indexOf(el);
	if (i > -1)
		books.splice(i, 1);
	if (el.querySelector('.read'))
			rb.textContent = parseInt(rb.textContent) - 1;
	else
			nrb.textContent = parseInt(nrb.textContent) - 1;
	tb.textContent = parseInt(tb.textContent) - 1;
	booksList.removeChild(el);
}

function createBook() {
    const book = new Book(titleIn.value, authorIn.value, pagesIn.value, isReadIn.checked);
    const uid = crypto.randomUUID();
    const isRead = book.read === 'Read';
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.setAttribute('id', uid);

    newBook.innerHTML = `
        <p class="title">${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <div class="buttons">
            <button class="status${isRead ? ' read' : ''}">${book.read}</button>
            <button class="remove-book"><i class="ri-delete-bin-line"></i></button>
        </div>
    `;
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

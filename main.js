const dialog = document.querySelector(".new-book");
const title = document.querySelector('#book-title');
const btnAdd = document.getElementById("btn-add");
const btnAddBook = dialog.querySelector("#add");
const btnCancel = dialog.querySelector("#cancel");
const books = [];

btnAdd.addEventListener("click", () => {
	dialog.showModal();
});

dialog.addEventListener('close', ()=>{
	if (dialog.returnValue === '' || dialog.returnValue === 'cancel')
		return ;
});

btnCancel.addEventListener('click', (event)=>{
	event.preventDefault();
	dialog.close('cancel');
})
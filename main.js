const myLibrary = []

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readSentence = function(){
        return this.read ? "already read" : "not read yet";
    }
    this.info = function() {
        let info = `${this.title}, ${this.author}, ${this.pages}, ${this.readSentence()}`;
        console.log(info);
    }
}

Book.prototype.changeReadStatus = function() {
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    showNewBook(newBook);
}

function bookCard(book){
    const cardContainer = document.createElement('div');
    const titleHeader = document.createElement('h3');
    const author = document.createElement('h4');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const deleteButton = addDeleteButton();
    const readButton = addToggleReadButton();
    cardContainer.classList.add('card-container');
    cardContainer.dataset.id = book.id
    titleHeader.innerHTML = book.title;
    author.innerHTML = `By ${book.author}`;
    pages.innerHTML = `Pages: ${book.pages}`;
    read.innerHTML = `Read?: ${book.read}`
    cardContainer.appendChild(titleHeader);
    cardContainer.appendChild(author);
    cardContainer.appendChild(pages);
    cardContainer.appendChild(read);
    cardContainer.appendChild(deleteButton)
    cardContainer.appendChild(readButton);
    return cardContainer;
}

function showNewBook(book){
    let newBook = bookCard(book);
    const booksContainer = document.getElementById('books-container');
    booksContainer.appendChild(newBook);
}

function addDeleteButton(){
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        const bookCard = event.target.parentElement;
        const bookId = bookCard.dataset.id
        myLibrary.forEach((book) => {
            if (book.id === bookId){
                const index = myLibrary.indexOf(book);
                myLibrary.splice(index, 1);
            }
        })
        bookCard.remove()
    })
    return deleteButton
}

function addToggleReadButton(){
    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.innerHTML = 'Read?'
    readButton.addEventListener('click', (event) => {
        const card = event.target.parentElement;
        const bookId = card.dataset.id
        myLibrary.forEach((book) => {
            if (book.id === bookId){
                book.changeReadStatus()
                card.replaceWith(bookCard(book))
            }
        })
       
    })

    return readButton
}


function showBooks() {
    const booksContainer = document.getElementById('books-container');
    myLibrary.forEach((book) => {
        booksContainer.appendChild(bookCard(book));
    })
}

function addBookButton(){
    const addBookButton = document.createElement('button');
    const body = document.querySelector('body');
    const dialog = document.querySelector('dialog');
    const dialogButton = document.querySelector("dialog button");
    addBookButton.innerHTML = 'Add Book';
    body.appendChild(addBookButton)
    addBookButton.addEventListener("click", () => {
        dialog.showModal();
    });
    dialogButton.addEventListener("click", () => {
        dialog.close();
    })
}

function catchSubmission(){
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const bookForm = document.getElementById('book-form')
        const formData = new FormData(bookForm)
        console.log(formData)
        const author = formData.get('author');
        const title = formData.get('title');
        const pages = formData.get('pages');
        const read = formData.get('read');
        addBookToLibrary(author, title, pages, read);
        clearForm(bookForm);
    }) 
}


function clearForm(form){
    const inputs = form.getElementsByTagName('input');
    for (const input of inputs) {
        input.value = ''
    }
}





const hp = new Book('Chamber of Secrets', 'JK Rowling', 234, true );

myLibrary.push(hp);
showBooks();
addBookButton();
catchSubmission();
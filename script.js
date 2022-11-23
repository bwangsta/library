let myLibrary = [
    new Book("Ranger's Apprentice", "John Flanagan", 282, true),
    new Book("Percy Jackson", "Rick Riordan", 282, true)
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary() {
    // do stuff here
}

function createBookElement(title, author) {
    const bookList = document.querySelector(".book-list")
    const newDiv = document.createElement("div");
    const titleElement = document.createElement("p");
    const authorElement = document.createElement("p");
    titleElement.textContent = title;
    authorElement.textContent = author;
    newDiv.classList.add("book")
    newDiv.appendChild(titleElement);
    newDiv.appendChild(authorElement);
    bookList.appendChild(newDiv);
}

document.querySelector(".add-book").addEventListener("click", (e) => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
    e.preventDefault();
});

function displayBooks() {
    myLibrary.forEach(book => {
        createBookElement(book.title, book.author)
    });
}
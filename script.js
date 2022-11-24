let myLibrary = [
    new Book("Ranger's Apprentice", "John Flanagan", 282, true),
    new Book("Percy Jackson", "Rick Riordan", 282, true)
];

const addBookForm = document.querySelector("#add-book-form");

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function render() {
    // remove all books on screen
    document.querySelectorAll(".book").forEach(book => {
        book.remove();
    });

    // rerenders all books on screen
    for (let i=0; i < myLibrary.length; i++) {
        createBookElement(i, myLibrary[i].title, myLibrary[i].author, myLibrary[i].hasRead);
    }

    const removeButtons = document.querySelectorAll(".book button");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentDiv = button.parentNode;
            const id = parentDiv.getAttribute("data-id");

            myLibrary.splice(id, 1);
            render();
            console.log(myLibrary);
            // document.querySelector("[data-id='" + id + "']").remove();
        });
    });
}

function createBookElement(id, title, author, hasRead) {
    const bookList = document.querySelector(".book-list")
    const newDiv = document.createElement("div");
    const titleText = document.createElement("p");
    const authorText = document.createElement("p");
    const removeButton = document.createElement("button");
    const hasReadCheckbox = document.createElement("input");

    hasReadCheckbox.setAttribute("type", "checkbox");
    newDiv.setAttribute("data-id", id);
    titleText.textContent = title;
    authorText.textContent = author;
    removeButton.textContent = "Remove";
    hasReadCheckbox.checked = hasRead;
    newDiv.classList.add("book")
    newDiv.appendChild(titleText);
    newDiv.appendChild(authorText);
    newDiv.appendChild(removeButton);
    newDiv.appendChild(hasReadCheckbox);
    bookList.appendChild(newDiv);
}

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();     // prevents the site from reloading when submitting the form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;   // .checked returns true/false while value returns on/off
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookForm.reset();    // resets form on submit
    render();
});

render();
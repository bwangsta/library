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
    for (let i = 0; i < myLibrary.length; i++) {
        createBookElement(i, myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].hasRead);
    }

    removeBook();   // allows books to be removed from the library
    checkboxChanged();  // allows reading status to be changed
}

function removeBook() {
    const removeButtons = document.querySelectorAll(".book button");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const parentDiv = button.parentNode.parentNode;
            const id = parentDiv.getAttribute("data-id");
            myLibrary.splice(id, 1);
            render();
        });
    });
}

function checkboxChanged() {
    const readCheckboxes = document.querySelectorAll(".book input[type='checkbox']");
    readCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            const parentDiv = checkbox.parentNode.parentNode;
            const id = parentDiv.getAttribute("data-id");
            myLibrary[id].hasRead = event.target.checked;
            console.log(myLibrary);
            // render(); 
        });
    });
}

function createBookElement(id, title, author, pages, hasRead) {
    const bookList = document.querySelector(".bookshelf")
    const newDiv = document.createElement("div");
    const titleText = document.createElement("p");
    const authorText = document.createElement("p");
    const pageText = document.createElement("p");
    const removeButton = document.createElement("button");
    const hasReadCheckbox = document.createElement("input");

    hasReadCheckbox.setAttribute("type", "checkbox");
    newDiv.setAttribute("data-id", id);
    titleText.textContent = title;
    authorText.textContent = author;
    pageText.textContent = pages;
    removeButton.textContent = "x";
    removeButton.classList.add("btn-close");
    hasReadCheckbox.checked = hasRead;
    newDiv.classList.add("book")
    newDiv.appendChild(removeButton);
    newDiv.appendChild(titleText);
    newDiv.appendChild(authorText);
    newDiv.appendChild(pageText);
    newDiv.appendChild(hasReadCheckbox);
    bookList.appendChild(newDiv);
}

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();     // prevents the site from reloading when submitting the form
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;   // .checked returns true/false while value returns on/off
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookForm.reset();    // resets form on submit
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    render();
});

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".btn-close");
newBookBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});
overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
});

render();
const myLibrary = [];


function Book(bookName, pages, author, year, read) {
    this.id = crypto.randomUUID();
    this.bookName = bookName;
    this.pages = pages;
    this.author = author;
    this.year = year;
    this.read = read;
}


function addBookToLibrary(bookName, pages, author, year, read) {
    const book = new Book(bookName, pages, author, year, read); 
    myLibrary.push(book);
}


function showBooks() {
    // Adds books from list to the page
    
    const collection = document.querySelector(".collection");
    collection.replaceChildren(); // Deleting all current children elements

    for (const item of myLibrary) {
        const bookCard = document.createElement("li");
        bookCard.classList.add("book");
        bookCard.setAttribute("data-id", item.id);

        // Book's name
        const bookName = document.createElement("h3");
        bookName.classList.add("book-name");
        bookName.textContent = item.bookName;

        // Book's author
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("author");
        const authorText = document.createElement("span");
        authorText.classList.add("bold");
        authorText.textContent = "Author: ";
        bookAuthor.append(authorText, item.author);

        // Book's year
        const bookYear = document.createElement("time");
        bookYear.classList.add("year");
        bookYear.setAttribute("datetime", item.year);
        const yearText = document.createElement("span");
        yearText.classList.add("bold");
        yearText.textContent = "Year: ";
        bookYear.append(yearText, item.year);
        
        // Book's pages
        const bookPages = document.createElement("p");
        bookPages.classList.add("pages");
        pagesText = document.createElement("span");
        pagesText.classList.add("bold");
        pagesText.textContent = "Pages: ";
        bookPages.append(pagesText, item.pages);

        // Book's read status
        const readStatus = document.createElement("p")
        readStatus.classList.add("read");
        const readText = document.createElement("span");
        readText.classList.add("bold");
        readText.textContent = "Read: ";
        readStatus.append(readText, item.read ? "Yes" : "No");

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        deleteButton(deleteBtn);

        bookCard.append(bookName, bookAuthor, bookYear, bookPages, readStatus, deleteBtn);
        collection.append(bookCard);
    }
}


function addButton() {
    const dialogForm = document.querySelector("#newBookDialog");
    const newBookForm = document.querySelector("#newBookForm");
    const addBook = document.querySelector("#addBook");
    const cancelButton = document.querySelector("#cancelButton");

    const bookName = document.querySelector("#bookName");
    const bookAuthor = document.querySelector("#author");
    const bookYear = document.querySelector("#year");
    const bookPages = document.querySelector("#pages");
    const readStatus = document.querySelector("#no")

    addBook.addEventListener("click", (event) => {
        dialogForm.showModal();
    })

    newBookForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addBookToLibrary(bookName.value, bookPages.value, bookAuthor.value, bookYear.value, readStatus.checked ? false : true);
        showBooks();
        dialogForm.close();
        newBookForm.reset();
    });

    dialogForm.addEventListener("close", (event) => {
        newBookForm.reset();
    });

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        dialogForm.close();
    });
}


function deleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", (event) => {
        const targetId = event.target.parentElement.dataset.id;

        for (const item of myLibrary) {
            if (item.id == targetId) {
                const index = myLibrary.indexOf(item);
                myLibrary.splice(index, 1);
                break;
            } 
        }

        showBooks();
    });
}


addBookToLibrary("Hobbit", 310, "J.R.R.Tolkien", 1937, true);
addBookToLibrary("To Kill a Mockingbird", 281, "Harper Lee", 1960, false);

addButton();
showBooks();
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

        // Buttons
        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`
        deleteButton(deleteBtn);

        // Update read status button
        const readBtn = document.createElement("button");
        readBtn.classList.add("readBtn");
        readBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z"/></svg>`;
        readButton(readBtn);

        btnGroup.append(deleteBtn, readBtn);

        bookCard.append(bookName, bookAuthor, bookYear, bookPages, readStatus, btnGroup);
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
        const targetId = event.target.parentElement.parentElement.dataset.id;

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


function readButton(readBtn) {
    readBtn.addEventListener("click", (event) => {
        const targetId = event.target.parentElement.parentElement.dataset.id;

        for (const item of myLibrary) {
            if (item.id == targetId) {
                const index = myLibrary.indexOf(item);
                myLibrary[index].read = !myLibrary[index].read;
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
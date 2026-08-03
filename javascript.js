const myLibrary = [];

function Book(bookName, pages, author, year) {
    this.id = crypto.randomUUID();
    this.bookName = bookName;
    this.pages = pages;
    this.author = author;
    this.year = year;
}

function addBookToLibrary(bookName, pages, author, year) {
    const book = new Book(bookName, pages, author, year); 
    myLibrary.push(book);
}

function showBooks() {
    // Adds books from list to the page
    
    const collection = document.querySelector(".collection");

    for (const item of myLibrary) {
        const bookCard = document.createElement("li");
        bookCard.classList.add("book");

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
        bookYear.setAttribute("datetime", toString(item.year));
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


        bookCard.append(bookName, bookAuthor, bookYear, bookPages);
        collection.append(bookCard);
    }
}

addBookToLibrary("Gibberish", 25, "J.J.Simmons", 2015);
showBooks();
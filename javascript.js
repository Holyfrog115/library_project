const myLibrary = [];

function Book(pages, author, year) {
    this.id = crypto.randomUUID();
    this.pages = pages;
    this.author = author;
    this.year = year;
}

function addBookToLibrary(pages, author, year) {
    const book = new Book(pages, author, year); 
    myLibrary.push(book);
}

addBookToLibrary(121, "John", 1999);
addBookToLibrary(99, "Johnson", 2001);
console.log(myLibrary);
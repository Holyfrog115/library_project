function Book(pages, author, year) {
    this.id = crypto.randomUUID();
    this.pages = pages;
    this.author = author;
    this.year = year;
}
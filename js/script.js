//Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let info = this.title + " by " + this.author + ", " + pages + " pages, ";
        if(read) { info += "read";
        } else {
            info += "not read yet";
        };
        return info;
    }
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
console.log(book1.info());

const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book2.info());



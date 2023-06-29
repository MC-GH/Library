let addBookButton = document.querySelector("#addBook");
const newBookWindow = document.querySelector("#modal");
addBookButton.addEventListener('click', openModal);

const closeButton = document.querySelector('#closeButton');
closeButton.addEventListener('click', () => {
    newBookWindow.style.display = ''});

const addBookToList = document.querySelector('#addToList');

let myLibrary = [];

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

function openModal() {
    if(newBookWindow.style.display === '') {
        newBookWindow.style.display = 'block';
    } else {
        newBookWindow.style.display = '';
    }
}

//Create Book object based on userinput
function createNewBook() {

}

function addBookToLibrary() {
    //Add the newly created book (based on userInput) to the array
    //loop through the Array, and display each Book object on the page
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
console.log(book1.info());

const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book2.info());



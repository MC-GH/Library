const ADDBOOKBUTTON = document.querySelector("#addBook");
const BOOKMODAL = document.querySelector("#modal");
ADDBOOKBUTTON.addEventListener('click', openModal);

//Global scope so the value can be changed on each click
const READCHECKBOX = document.querySelector('#read');
READCHECKBOX.addEventListener('click', () => {
    if(READCHECKBOX.value === 'false') {
        READCHECKBOX.value = 'true';
        console.log(READCHECKBOX.value);
    } else {
        READCHECKBOX.value = 'false';
        console.log(READCHECKBOX.value);
    }
})

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
    if(BOOKMODAL.style.display === '') {
        BOOKMODAL.style.display = 'block';
    } else {
        BOOKMODAL.style.display = '';
    }

    const CLOSEBUTTON = document.querySelector('#closeButton');
    CLOSEBUTTON.addEventListener('click', closeModal);  

    const ADDBUTTON = document.querySelector('#addButton');
    ADDBUTTON.addEventListener('click', () => {
     createNewBook();
    })
}

function closeModal() {
    BOOKMODAL.style.display = '';
}

//Create Book object based on userinput
function createNewBook() {
    const BOOKNAME = document.querySelector('#bookName');
    const AUTHORNAME = document.querySelector('#authorName');
    const PAGES = document.querySelector('#nrPages');
    console.log(PAGES.value);
    console.log(BOOKNAME.value);
    console.log(AUTHORNAME.value);
    
    //if all fields have a value. (will return true if there is one)
    if(BOOKNAME.value && AUTHORNAME.value && PAGES.value) {
        let book = new Book(BOOKNAME.value, AUTHORNAME.value, PAGES.value, READ.value);
        addBookToLibrary(book);
        resetInput();
        closeModal();
    } else {
        const ERRORMESSAGE = document.querySelector('#error');
        ERRORMESSAGE.style.display = 'block';
    }

    function resetInput() {
        BOOKNAME.value = '';
        AUTHORNAME.value = '';
        PAGES.value = '';
        READ.value = '';
    }
}

function addBookToLibrary(newBook) {
    //Add the newly created book (based on userInput) to the array
    //loop through the Array, and display each Book object on the page
    
    //At the start, the library is empty so function does not execute.
    if(myLibrary.length === 0) {
        myLibrary.push(newBook);
        console.log("Book added.")
        createCard(newBook);
    } else {
        myLibrary.forEach(book => {
            if(book.title === newBook.title) {
                console.log("Book already in collection.");
            } else {
                console.log("Not yet in library.");
                myLibrary.push(newBook);
                createCard(newBook);
            }
        });
    }
}

function createCard(book) {
    const CARD = document.createElement('div');
    CARD.classList.add('card');
    
    const TITLE = document.createElement('p');
    TITLE.classList.add('title');
    TITLE.textContent = book.title;

    const AUTHOR = document.createElement('p');
    AUTHOR.classList.add('author');
    AUTHOR.textContent = book.author;

    const PAGES = document.createElement('p');
    PAGES.classList.add('pages');
    PAGES.textContent = book.pages;

    const READBUTTON = document.createElement('button');
    READBUTTON.classList.add('read');
    if(book.read === 'true') {
        READBUTTON.textContent = 'Read';
    } else {
        READBUTTON.textContent = 'Not Read';
    }
    //Add event listener on READBUTTON, pass book object and button to function changeReadStatus
    //This will both update the Object value as well as visual display of button
    READBUTTON.addEventListener('click', () => {
        changeReadStatus(book, READBUTTON);
    })

    const REMOVEBUTTON = document.createElement('button');
    REMOVEBUTTON.textContent = 'Remove';

    REMOVEBUTTON.addEventListener('click', () => {
        removeBook(book);
    })

    CARD.appendChild(TITLE);
    CARD.appendChild(AUTHOR);
    CARD.appendChild(PAGES);
    CARD.appendChild(READBUTTON);
    CARD.appendChild(REMOVEBUTTON);

    const COLLECTION = document.querySelector('#bookCollection'); 
    COLLECTION.appendChild(CARD);
}

function changeReadStatus(book, readButton) {
    book.read = !book.read;
    readButton.textContent = book.read ? 'Read' : 'Not Read';
}

function removeBook(bookToDelete) {
    for(let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === bookToDelete.title) {
            //splice allows you to pass the index of which you want to remove the item, + the amount of items
            myLibrary.splice(i,1);
            console.log(bookToDelete.title + " has been removed");
        }
    }
}
    //Also remove the card => Still to do


let book1 = new Book("The Hobbit", "JRR Tolkien", 782, 'true')
addBookToLibrary(book1);



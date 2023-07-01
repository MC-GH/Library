const ADDBOOKBUTTON = document.querySelector("#addBook");
ADDBOOKBUTTON.addEventListener('click', openModal);

//Global scope so the value can be changed on each click
const READCHECKBOX = document.querySelector('#read');
READCHECKBOX.addEventListener('click', () => {
    if(!READCHECKBOX.checked) {
        READCHECKBOX.checked;
        console.log("test output of checked attribute:" + READCHECKBOX.checked)
    } else {
        !READCHECKBOX.checked;
        console.log("test output of checked attribute:" + READCHECKBOX.checked)
    }
})

let myLibrary = [];
setUpEventHandlers();

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


    // function closeButtonClickHandler(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE) {
    //     closeModal(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE);
    // }

    // function addButtonClickHandler(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE) {
    //     createNewBook(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE);
    // }


function openModal() {
    const BOOKNAME = document.querySelector('#bookName');
    const AUTHORNAME = document.querySelector('#authorName');
    const PAGES = document.querySelector('#nrPages');
    const READCHECKBOX = document.querySelector('#read');
    const ERRORMESSAGE = document.querySelector('#error');
    resetModalInput(BOOKNAME,AUTHORNAME,PAGES,READCHECKBOX,ERRORMESSAGE);

    const BOOKMODAL = document.querySelector("#modal");
    if(BOOKMODAL.style.display === '') {
        BOOKMODAL.style.display = 'block';
    } else {
        BOOKMODAL.style.display = '';
    }
    // //Remove existing Event listener every time the modal is opened
    // const CLOSEBUTTON = document.querySelector('#closeButton');
    // CLOSEBUTTON.removeEventListener('click', closeButtonEventHandler);
    // CLOSEBUTTON.addEventListener('click', closeButtonEventHandler);

    // //Remove existing Event listener every time the modal is opened
    // const ADDBUTTON = document.querySelector('#addButton');
    // ADDBUTTON.removeEventListener('click', addButtonEventHandler);
    // ADDBUTTON.addEventListener('click', addButtonEventHandler);

    // function addButtonEventHandler() {
    //     createNewBook(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE);
    // }

    // function closeButtonEventHandler() {
    //     closeModal(BOOKMODAL);
    // }
}

function setUpEventHandlers() {

    const BOOKNAME = document.querySelector('#bookName');
    const AUTHORNAME = document.querySelector('#authorName');
    const PAGES = document.querySelector('#nrPages');
    const READCHECKBOX = document.querySelector('#read');
    const ERRORMESSAGE = document.querySelector('#error');
    const BOOKMODAL = document.querySelector("#modal");

        //Remove existing Event listener every time the modal is opened
        const CLOSEBUTTON = document.querySelector('#closeButton');
        CLOSEBUTTON.removeEventListener('click', closeButtonEventHandler);
        CLOSEBUTTON.addEventListener('click', closeButtonEventHandler);
    
        //Remove existing Event listener every time the modal is opened
        const ADDBUTTON = document.querySelector('#addButton');
        ADDBUTTON.removeEventListener('click', addButtonEventHandler);
        ADDBUTTON.addEventListener('click', addButtonEventHandler);
    
        function addButtonEventHandler() {
            createNewBook(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE);
        }
    
        function closeButtonEventHandler() {
            closeModal(BOOKMODAL);
        }
}

//Issue with arrow function event listeners. 

function closeModal(BOOKMODAL) {
    BOOKMODAL.style.display = '';
}

//Create Book object based on userinput
function createNewBook(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE) {
    //if all fields have a value. (will return true if there is one)
    if(BOOKNAME.value && AUTHORNAME.value && PAGES.value) {
        let book = new Book(BOOKNAME.value, AUTHORNAME.value, PAGES.value, READCHECKBOX.checked);
        addBookToLibrary(book);
        closeModal(BOOKMODAL);
    } else {
        ERRORMESSAGE.style.display = 'block';
    }
}

function resetModalInput(BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE) {
    BOOKNAME.value = '';
    AUTHORNAME.value = '';
    PAGES.value = '';
    READCHECKBOX.checked = false;
    console.log("reset function triggered");
    ERRORMESSAGE.style.display = 'none';
} 

function addBookToLibrary(newBook) {
    //Add the newly created book (based on userInput) to the array
    //loop through the Array, and display each Book object on the page
    
    //If library is empty, add the book immediately
    // if(myLibrary.length === 0) {
    //     myLibrary.push(newBook);
    //     console.log("Book added.")
    //     createCard(newBook);
    //     return;
    // }
    // for(let i = 0; i < myLibrary.length; i++) {
    //     if(myLibrary[i].title === newBook.title) {
    //         console.log("Book already in collection.");
    //         return;
    //     }
    // }

    const isBookInLibrary = myLibrary.some(book => book.title === newBook.title);
    console.log("value that checks if book is already in array: " + isBookInLibrary);
    
    if(isBookInLibrary) {
        console.log("Book already in collection.");
    } else {
        myLibrary.push(newBook);
        createCard(newBook);
        console.log("Book added to array");
    }

    // myLibrary.push(newBook);
    // createCard(newBook);
    // console.log("Book added to array");
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
    READBUTTON.classList.add('readButton');
    if(book.read === true) {
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


// let book1 = new Book("The Hobbit", "JRR Tolkien", 782, true)
// addBookToLibrary(book1);



// addBookToLibrary(new Book("The hobbit", "JRR T", 578, true));
// addBookToLibrary(new Book("The Wizard of Ozz", "Tom", 78, false));

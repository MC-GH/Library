const ADDBOOKBUTTON = document.querySelector("#addBook");
ADDBOOKBUTTON.addEventListener('click', openModal);

let myLibrary = [];

addBookToLibrary(new Book("The hobbit", "JRR T", 578, true));
addBookToLibrary(new Book("The Wizard of Ozz", "Tom", 78, false));
addBookToLibrary(new Book("How to train your dragon", "JRR T", 99, true));
addBookToLibrary(new Book("Javascript for Dummies", "Bob", 875, false));
addBookToLibrary(new Book("The Wizard of Larry", "Tom", 78, false));
addBookToLibrary(new Book("How to train your dog", "JRR T", 99, true));
addBookToLibrary(new Book("Javascript for Pros", "Bob", 875, false));

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

function createModal() {
    const HTMLBODY = document.querySelector('body');

    const MODALBACKGROUND = document.createElement('div');
    MODALBACKGROUND.setAttribute('id', "modalBackground");
    HTMLBODY.appendChild(MODALBACKGROUND);

    const MODALDIV = document.createElement('div');
    MODALDIV.setAttribute('id',"modal");
    HTMLBODY.appendChild(MODALDIV);

    const CLOSEMODALICON = document.createElement('span');
    CLOSEMODALICON.setAttribute('id', "closeButton");
    CLOSEMODALICON.textContent = 'x';
    MODALDIV.appendChild(CLOSEMODALICON);

    const FORM = document.createElement('form');
    MODALDIV.appendChild(FORM);
    
    const NAMELABEL = document.createElement('label');
    NAMELABEL.setAttribute('for', "bookName");
    NAMELABEL.textContent = "Book name: ";
    FORM.appendChild(NAMELABEL);

    const NAMEINPUT = document.createElement('input');
    NAMEINPUT.setAttribute('type', "text");
    NAMEINPUT.setAttribute('id', "bookName");
    NAMEINPUT.setAttribute('name', "bookName");
    FORM.appendChild(NAMEINPUT);

    const AUTHORLABEL = document.createElement('label');
    AUTHORLABEL.setAttribute('for', "authorName");
    AUTHORLABEL.textContent = "Author name: ";
    FORM.appendChild(AUTHORLABEL);

    const AUTHORINPUT = document.createElement('input');
    AUTHORINPUT.setAttribute('type', "text");
    AUTHORINPUT.setAttribute('id', "authorName");
    AUTHORINPUT.setAttribute('name', "authorName");
    FORM.appendChild(AUTHORINPUT);

    const PAGESLABEL = document.createElement('label');
    PAGESLABEL.setAttribute('for', "nrPages");
    PAGESLABEL.textContent = "Number of pages: ";
    FORM.appendChild(PAGESLABEL);

    const PAGESINPUT = document.createElement('input');
    PAGESINPUT.setAttribute('type', "number");
    PAGESINPUT.setAttribute('id', "nrPages");
    PAGESINPUT.setAttribute('name', "nrPages");
    FORM.appendChild(PAGESINPUT);

    const READLABEL = document.createElement('label');
    READLABEL.setAttribute('for', "read");
    READLABEL.textContent = "Read?";
    FORM.appendChild(READLABEL);

    const READINPUT = document.createElement('input');
    READINPUT.setAttribute('type', "checkbox");
    READINPUT.setAttribute('id', "read");
    READINPUT.setAttribute('name', "read");
    READINPUT.setAttribute('value', false);
    FORM.appendChild(READINPUT);

    const ADDBUTTON = document.createElement('button');
    ADDBUTTON.setAttribute('type', "button");
    ADDBUTTON.setAttribute('id', "addButton");
    ADDBUTTON.textContent = "Add to list";
    FORM.appendChild(ADDBUTTON);

    const ERRORMESSAGE = document.createElement('div');
    ERRORMESSAGE.setAttribute('id', "error");
    ERRORMESSAGE.textContent = "Please fill in all fields before submitting a book.";
    FORM.appendChild(ERRORMESSAGE);
}

function openModal() {
    createModal();
    setUpEventHandlers();
}

function setUpEventHandlers() {
    const BOOKNAME = document.querySelector('#bookName');
    const AUTHORNAME = document.querySelector('#authorName');
    const PAGES = document.querySelector('#nrPages');
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

        //Checkbox
        const READCHECKBOX = document.querySelector('#read');
        READCHECKBOX.addEventListener('click', readCheckBoxEventHandler);

    
        function addButtonEventHandler() {
            createNewBook(BOOKMODAL, BOOKNAME, AUTHORNAME, PAGES, READCHECKBOX, ERRORMESSAGE);
        }
    
        function closeButtonEventHandler() {
            closeModal(BOOKMODAL);
        }

        function readCheckBoxEventHandler() {
            if(!READCHECKBOX.checked) {
                READCHECKBOX.checked;
                console.log("test output of checked attribute:" + READCHECKBOX.checked)
            } else {
                !READCHECKBOX.checked;
                console.log("test output of checked attribute:" + READCHECKBOX.checked)
            }
        }
}

function closeModal(BOOKMODAL) {
    BOOKMODAL.remove();
    const MODALBG = document.querySelector('#modalBackground');
    MODALBG.remove();
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

function addBookToLibrary(newBook) {
    //Add the newly created book (based on userInput) to the array
    //loop through the Array, and display each Book object on the page

    const isBookInLibrary = myLibrary.some(book => book.title === newBook.title);
    console.log("value that checks if book is already in array: " + isBookInLibrary);
    
    if(isBookInLibrary) {
        console.log("Book already in collection.");
    } else {
        myLibrary.push(newBook);
        createCard(newBook);
        console.log("Book added to array");
    }
}

//Only to be called when altering the indexes: i.e. removing a book
function generateCards() {
    myLibrary.forEach(book => createCard(book));
}

function createCard(book) {
    
    const CARD = document.createElement('div');
    CARD.classList.add('card');

    const INDEX = myLibrary.indexOf(book);
    // console.log(book.title + " can be found at index: " + INDEX);
    CARD.setAttribute('data-index', INDEX);
    
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
        removeBook(book, REMOVEBUTTON );
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

function removeBook(bookToDelete, deleteButton) {
    //store the data-index attribute of the parent element (card)
    const index = deleteButton.parentElement.getAttribute('data-index');
    for(let i = 0; i < myLibrary.length; i++) {
        if(i.toString() === index) {
            //splice allows you to pass the index of which you want to remove the item, + the amount of items
            myLibrary.splice(i,1);
            console.log(bookToDelete.title + " has been removed");
            
            //remove all cards + generate again
            const collectionElement = document.querySelector('#bookCollection');
            while(collectionElement.firstChild) {
                collectionElement.removeChild(collectionElement.firstChild);
            }
            generateCards();
        }
    }
}

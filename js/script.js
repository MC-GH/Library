const ADDBOOKBUTTON = document.querySelector("#addBook");
const BOOKMODAL = document.querySelector("#modal");
ADDBOOKBUTTON.addEventListener('click', openModal);



//Global scope so the value can be changed on each click
const READ = document.querySelector('#read');
READ.addEventListener('click', () => {
    if(READ.value === 'false') {
        READ.value = 'true';
    } else {
        READ.value = 'false';
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
    console.log(PAGES.VALUE);
    console.log(BOOKNAME.VALUE);
    console.log(AUTHORNAME.VALUE);
    
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

function addBookToLibrary(book) {
    //Add the newly created book (based on userInput) to the array
    //loop through the Array, and display each Book object on the page
    myLibrary.push(book);
    console.log("Current books in library: ");
    myLibrary.forEach(book => {
        console.log(book.info());
    });
}



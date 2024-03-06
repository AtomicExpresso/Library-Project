//==================================================
const bookBtn = document.getElementById('bookbtn');
const clearBooksBtn = document.getElementById('clearallbtn');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputStatus = document.getElementById('read');
const bookForm = document.getElementById('lib-form');
const addBtn = document.getElementById('addbtn');
const clearBtn = document.getElementById('clearbtn');
const exitBtn = document.getElementById('exitbtn');
const shelf = document.getElementById('shelf');
const titleText = document.getElementById('title-text');
const readBtnStatus = document.getElementById('readbtn');
const darkTheme = document.getElementById('darktheme'); //Dark-mode
let listStat = document.getElementsByClassName('liststat');
const formBackground = document.getElementById('form-back');

//Used for form input error detection
const titleError = document.getElementById('titleerror');
const authorError = document.getElementById('authorerror');
const pagesError = document.getElementById('pageserror');
const statusError = document.getElementById('statuserror');

//Removes the form and the form errors
bookForm.style.display = 'none';
titleError.style.display = 'none';
authorError.style.display = 'none';
pagesError.style.display = 'none';
statusError.style.display = 'none';

let myLibary = []; //Libary array
let bookInventory = 0; //used to limit book inventory
let readbtnstatus = 0; //used for changing the read status on a book
let darkThemeStatus = 0; //Tracks if dark-mode is enabled

//====Libary Classes====
//New book parent class
class book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

//====Libary Logic====
//creates a new book instance
function addBookToLibary() {
  let bookTitle = inputTitle.value;
  let bookAuthor = inputAuthor.value;
  let bookPages = inputPages.value;
  let bookStatus = inputStatus.value;

  let customBook = new book(
    `${bookTitle}`,
    `${bookAuthor}`,
    `${bookPages}`,
    `${bookStatus}`
  );

  myLibary.push(customBook);
  console.log(myLibary);
  console.log(inputTitle.value);

  displayShelf();
}

//displays the new book in the libary
function displayShelf() {
  if (bookInventory < 5) {
    shelf.innerHTML = '';

    for (i = 0; i < myLibary.length; i++) {
      let book = myLibary[i];
      let bookTitleText = `${book.title}`;
      let bookAuthorText = `Author: ${book.author}`;
      let bookPageText = `Pages: ${book.pages}`;
      let bookStatusText = `Status: ${book.status}`;

      let listTitle = document.createElement('h1');
      let listAuthor = document.createElement('p');
      let listPages = document.createElement('p');
      let listStatus = document.createElement('p');
      let readBtn = document.createElement('button');
      let deleteBtn = document.createElement('button');

      readBtn.textContent = 'Status';
      readBtn.classList.add('readbtn');
      listStatus.classList.add('liststat');
      readBtn.textContent = 'Status';
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('deletebtn');

      listTitle.textContent = bookTitleText;
      listAuthor.textContent = bookAuthorText;
      listPages.textContent = bookPageText;
      listStatus.textContent = bookStatusText;

      let newDiv = document.createElement('div');
      newDiv.appendChild(listTitle);
      newDiv.appendChild(listAuthor);
      newDiv.appendChild(listPages);
      newDiv.appendChild(listStatus);
      newDiv.appendChild(readBtn);
      newDiv.appendChild(deleteBtn);
      newDiv.classList.add('bookcontent');

      newDiv.dataset.index = i;

      shelf.appendChild(newDiv);
      titleText.innerText = 'Add books';
      titleText.style.color = 'black';
    }
  } else {
    console.log('You reached max books!');
    titleText.innerText = 'You have max books!';
    titleText.style.color = 'red';
  }

  bookInventory++; //used to limit libary inventory
}

//====Error Dectection====
//Checks if input form is valid, if so adds a new book to the libary
addBtn.addEventListener('click', function () {
  if (inputTitle.value === '') {
    titleError.style.display = 'flex';
    titleError.style.color = 'red';
    titleError.innerText = 'You must put a title';
  } else {
    titleError.style.display = 'none';
  }
  if (inputAuthor.value === '') {
    authorError.style.display = 'flex';
    authorError.style.color = 'red';
    authorError.innerText = 'You must put a author';
  } else {
    authorError.style.display = 'none';
  }
  if (inputPages.value === '') {
    pagesError.style.display = 'flex';
    pagesError.style.color = 'red';
    pagesError.innerText = 'You need to put the pages';
  } else {
    pagesError.style.display = 'none';
  }
  if (inputStatus.value === '') {
    statusError.style.display = 'flex';
    statusError.style.color = 'red';
    statusError.innerText = 'You need to put a status';
  } else {
    statusError.style.display = 'none';
  }

  if (
    inputTitle.value !== '' &&
    inputAuthor.value !== '' &&
    inputPages.value !== '' &&
    inputStatus.value !== ''
  ) {
    console.log('hi');

    addBookToLibary();
    clearInputFields();
  }
});

//======User Input======
//Opens up book input form
bookBtn.addEventListener('click', function () {
  bookForm.classList.remove('closeanimation');
  formBackground.classList.remove('closeanimation');
  bookForm.style.display = 'flex';
  formBackground.style.display = 'flex';
  clearInputFields();
});

//Clears the input form
clearBtn.addEventListener('click', function () {
  clearInputFields();
});

//Closes the input form
exitBtn.addEventListener('click', function () {
  bookForm.classList.add('closeanimation');
  formBackground.classList.add('closeanimation');
  clearInputFields();
});

//Clears the input form fields
const clearInputFields = () => {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  inputStatus.value = '';
  titleError.style.display = 'none';
  authorError.style.display = 'none';
  pagesError.style.display = 'none';
  statusError.style.display = 'none';
};

//Deletes all books from the libary
clearBooksBtn.addEventListener('click', function () {
  myLibary = [];
  bookInventory = 0;
  shelf.innerHTML = '';
  titleText.innerText = 'Add books';
  titleText.style.color = 'black';
});

//Changes the read status on click
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('readbtn')) {
    let clickedReadBtn = event.target;
    let parentDiv = clickedReadBtn.parentNode;
    let listStat = parentDiv.querySelector('.liststat');

    readbtnstatus++;

    if (readbtnstatus % 2 === 0) {
      listStat.textContent = 'Read';
      listStat.style.color = 'green';
    } else {
      listStat.textContent = "Haven't read";
      listStat.style.color = 'red';
    }
  }
});

//For the delete button on each book
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('deletebtn')) {
    let clickedDeleteBtn = event.target;
    let parentDiv = clickedDeleteBtn.parentNode;
    let deletethis = parentDiv.querySelector('.bookcontent');

    let indexToRemove = parseInt(parentDiv.dataset.index);

    if (indexToRemove !== -1) {
      bookInventory -= 1;
      parentDiv.style.display = 'none';

      // Remove the element from the array
      myLibary.splice(indexToRemove, 1);

      // Call the function to update the display
      displayShelf();
      console.log('hi');
      console.log(myLibary);
    }
  }
});

//Dark-theme
darkTheme.addEventListener('click', function () {
  darkThemeStatus++;

  if (darkThemeStatus % 2 === 0) {
    //Dark mode
    document.body.style.backgroundColor = '#202123';
    document.getElementById('nav').style.backgroundColor = '#323639';
    document.getElementById('fil-bar').style.backgroundColor = '#484d53';
    document.getElementById('bookbtn').style.backgroundColor = '#2c2c2c';
    document.getElementById('clearallbtn').style.backgroundColor = '#2c2c2c';
    document.getElementById('darktheme').style.backgroundColor = '#2c2c2c';
  } else {
    //light mode
    darkbtnstatus = 0;
    document.body.style.backgroundColor = 'white';
    document.getElementById('nav').style.backgroundColor = '#004333';
    document.getElementById('fil-bar').style.backgroundColor = '#efefef';
    document.getElementById('bookbtn').style.backgroundColor = '#0077ff';
    document.getElementById('clearallbtn').style.backgroundColor = '#00a10b';
    document.getElementById('darktheme').style.backgroundColor = '#ff8000';
  }
});

displayShelf();
//==================================================

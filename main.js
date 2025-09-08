"use strict"

// Constructor function για Book objects
function Book(title, author, pages, read, id){
    if(!new.target){
        throw Error ("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function(){
        console.log(`The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, id: ${this.id}`);
    }
}

// Πίνακας για αποθήκευση όλων των βιβλίων
const myLibrary = [];

// Function που δέχεται παραμέτρους και δημιουργεί Book objects
function addBookToLibrary(title, author, pages, read){
    let id = crypto.randomUUID();
    // Δημιουργία νέου Book object με τον constructor
    const newBook = new Book(title, author, pages, read, id);
    // Προσθήκη του object στον πίνακα
    myLibrary.push(newBook);

    console.log("Book added successfully:");
    newBook.info();
    console.log("Total books in library: " + myLibrary.length);
    console.log("---");
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 310, "Yes");
addBookToLibrary("The Tommyknockers", "Stephen King", 558, "Yes");
addBookToLibrary("Weaveworld", "Clive Barker", 672, "No");


function displayLibrary(){
    let container = document.querySelector('.libraryDisplay');
    container.innerHTML = "";
    for(let book of myLibrary){

        // Ελέγχουμε αν το βιβλίο είναι διαβασμένο για να ορίσουμε το checked
        const isChecked = book.read.toLowerCase() === "yes" ? "checked" : "";

        container.insertAdjacentHTML("beforeend", `
            <div class="item styled" data-id="${book.id}">
                <p class="title"><b>Title: ${book.title}</b></p>
                <p class="author"><b>Author:</b> ${book.author} </p>
                <p class="pages"><b>Pages:</b> ${book.pages} </p>
                <p class="id"><b>Id:</b> ${book.id} </p>
                <div class="field">
                    <span class="labelL">Read:</span>
                    <label class="switch">
                        <input type="checkbox" ${isChecked} data-book-id="${book.id}">
                        <span class="slider">
                            <span class="left">Yes</span>
                            <span class="right">No</span>
                        </span>
                    </label>
                </div>
                <br>
                <button class="remove">Remove</button>
            </div>
        `);
    }
}

displayLibrary();

const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

// Άνοιγμα modal
openBtn.onclick = function () {
    modal.style.display = "block";
}

// Κλείσιμο modal με ×
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Κλείσιμο modal αν κάνεις κλικ έξω από το περιεχόμενο
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.getElementById("newBookForm").addEventListener("submit",function(e){
    e.preventDefault();

    let isValid = true;

    let titleInput = document.getElementById("titleName");
    let titleError = document.getElementById("titleError");
    if(!/^[a-zA-Z0-9\s]+$/.test(titleInput.value)){
        titleError.textContent = "Only letters, numbers and spaces allowed!";
        titleInput.classList.add("error");
        titleInput.classList.remove("valid");
        isValid = false;
    } else{
        titleError.textContent = "";
        titleInput.classList.remove("error");
        titleInput.classList.add("valid");
    }

    let authorInput = document.getElementById("authorName");
    let authorError = document.getElementById("authorError");
    if(!/^[a-zA-Z\s]+$/.test(authorInput.value)){
        authorError.textContent = "Only letters and spaces allowed!";
        authorInput.classList.add("error");
        authorInput.classList.remove("valid");
        isValid = false;
    } else{
        authorError.textContent = "";
        authorInput.classList.remove("error");
        authorInput.classList.add("valid");
    }

    let pagesInput = document.getElementById("pagesNumber");
    let pagesError = document.getElementById("pagesError");
    if(pagesInput.value <= 0){
        pagesError.textContent = "Pages must be a positive number.";
        pagesInput.classList.add("error");
        pagesInput.classList.remove("valid");
        isValid = false;
    } else{
        pagesError.textContent = "";
        pagesInput.classList.remove("error");
        pagesInput.classList.add("valid");
    }

    if(isValid){
        // Παίρνουμε την τιμή από το toggle switch
        const readToggle = document.getElementById("readToggle");
        const readValue = readToggle.checked ? "Yes" : "No";
    
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readValue);
        displayLibrary();
    
        // Κλείνουμε το modal και κάνουμε reset τη φόρμα
        modal.style.display = "none";
        document.getElementById("newBookForm").reset();
        alert("Form submitted successfully!");
    }
})

document.querySelector(".libraryDisplay").addEventListener("click", function(e){
    console.log("Clicked!");

    if(e.target.classList.contains("remove")){
        let bookDiv = e.target.closest(".item");
        let bookId = bookDiv.dataset.id;
        console.log("Θέλω να διαγράψω το βιβλίο με id:", bookId);

        let index = myLibrary.findIndex(function(book){
            console.log(`bookId: ${bookId}`);
            return book.id == bookId;
        });
        console.log("Βρέθηκε index:", index);

        if (index !== -1){
            myLibrary.splice(index, 1);
             console.log("Διέγραψα το βιβλίο με id:", bookId);
        } else{
            console.log("Δεν βρήκα βιβλίο με id:", bookId);
        }

        displayLibrary();
    }
});


// Προσθήκη event listener για το toggle switch
document.querySelector(".libraryDisplay").addEventListener("change", function(e){
    if(e.target.type === "checkbox" && e.target.dataset.bookId){
        const bookId = e.target.dataset.bookId;
        const isChecked = e.target.checked;
        
        // Βρίσκουμε το βιβλίο στο array
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        
        if(bookIndex !== -1){
            // Αλλάζουμε την τιμή του read
            myLibrary[bookIndex].read = isChecked ? "Yes" : "No";
            console.log(`Άλλαξε το read status του βιβλίου "${myLibrary[bookIndex].title}" σε: ${myLibrary[bookIndex].read}`);
        }
    }
});
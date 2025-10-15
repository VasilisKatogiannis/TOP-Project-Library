"use strict"

// Constructor function για δημιουργία νέων Book objects
function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

    this.info = function () {
        console.log(`The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, id: ${this.id}`);
    }
}

// Πίνακας για αποθήκευση όλων των βιβλίων/Book objects
const myLibrary = [];

// Function που δέχεται παραμέτρους και δημιουργεί Book objects στο myLibrary
function addBookToLibrary(title, author, pages, read) {
    let id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);

    console.log("Book added successfully:");
    newBook.info();
    console.log("Total books in library: " + myLibrary.length);
    console.log("---");
}

// Προσθήκη μεμονωμένων βιβλίων κατά την εκκίνηση για demonstration
addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 310, "Yes");
addBookToLibrary("The Tommyknockers", "Stephen King", 558, "Yes");
addBookToLibrary("Weaveworld", "Clive Barker", 672, "No");

// Function που εμφανίζει όλα τα βιβλία στη σελίδα
function displayLibrary() {
    let container = document.querySelector('.libraryDisplay');
    container.innerHTML = "";
    
    for (let book of myLibrary) {
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

// Καλεί τη συνάρτηση για να εμφανίσει τα αρχικά βιβλία.
displayLibrary();

// Διαχείριση modal
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
    // Reset form when closing modal
    document.getElementById("newBookForm").reset();
    resetValidationStyles();
}

// Κλείσιμο modal αν κάνεις κλικ έξω από το περιεχόμενο
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("newBookForm").reset();
        resetValidationStyles();
    }
}

// Function για επαναφορά των validation styles
function resetValidationStyles() {
    document.querySelectorAll('.error').forEach(errorSpan => {
        errorSpan.textContent = "";
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'error');
    });
}

// Real-time validation για Title
document.getElementById("titleName").addEventListener("input", function() {
    let titleError = document.getElementById("titleError");
    let value = this.value.trim();
    
    if (value === "") {
        titleError.textContent = "The title must be filled!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else if (!/^[a-zA-Z0-9\s\-_,.!?()]+$/.test(value)) {
        titleError.textContent = "Only letters, numbers, spaces and basic punctuation allowed!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else {
        titleError.textContent = "";
        this.classList.remove("error");
        this.classList.add("valid");
    }
});

// Real-time validation για Author
document.getElementById("authorName").addEventListener("input", function() {
    let authorError = document.getElementById("authorError");
    let value = this.value.trim();
    
    if (value === "") {
        authorError.textContent = "The author name must be filled!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(value)) {
        authorError.textContent = "Only letters, spaces, hyphens, apostrophes and dots allowed!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else {
        authorError.textContent = "";
        this.classList.remove("error");
        this.classList.add("valid");
    }
});

// Real-time validation για Pages
document.getElementById("pagesNumber").addEventListener("input", function() {
    let pagesError = document.getElementById("pagesError");
    let value = this.value.trim();
    
    if (value === "") {
        pagesError.textContent = "The pages field must be filled!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else if (value <= 0 || isNaN(value)) {
        pagesError.textContent = "Pages must be a positive number!";
        this.classList.add("error");
        this.classList.remove("valid");
    } else {
        pagesError.textContent = "";
        this.classList.remove("error");
        this.classList.add("valid");
    }
});

// Form Validation & Submission 
document.getElementById("newBookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Title Validation
    let titleInput = document.getElementById("titleName");
    let titleError = document.getElementById("titleError");
    let titleValue = titleInput.value.trim();
    
    if (titleValue === "") {
        titleError.textContent = "The title must be filled!";
        titleInput.classList.add("error");
        titleInput.classList.remove("valid");
        isValid = false;
    } else if (!/^[a-zA-Z0-9\s\-_,.!?()]+$/.test(titleValue)) {
        titleError.textContent = "Only letters, numbers, spaces and basic punctuation allowed!";
        titleInput.classList.add("error");
        titleInput.classList.remove("valid");
        isValid = false;
    } else {
        titleError.textContent = "";
        titleInput.classList.remove("error");
        titleInput.classList.add("valid");
    }

    // Author Validation
    let authorInput = document.getElementById("authorName");
    let authorError = document.getElementById("authorError");
    let authorValue = authorInput.value.trim();
    
    if (authorValue === "") {
        authorError.textContent = "The author name must be filled!";
        authorInput.classList.add("error");
        authorInput.classList.remove("valid");
        isValid = false;
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(authorValue)) {
        authorError.textContent = "Only letters, spaces, hyphens, apostrophes and dots allowed!";
        authorInput.classList.add("error");
        authorInput.classList.remove("valid");
        isValid = false;
    } else {
        authorError.textContent = "";
        authorInput.classList.remove("error");
        authorInput.classList.add("valid");
    }

    // Pages Validation
    let pagesInput = document.getElementById("pagesNumber");
    let pagesError = document.getElementById("pagesError");
    let pagesValue = pagesInput.value.trim();
    
    if (pagesValue === "") {
        pagesError.textContent = "The pages field must be filled!";
        pagesInput.classList.add("error");
        pagesInput.classList.remove("valid");
        isValid = false;
    } else if (pagesValue <= 0 || isNaN(pagesValue)) {
        pagesError.textContent = "Pages must be a positive number!";
        pagesInput.classList.add("error");
        pagesInput.classList.remove("valid");
        isValid = false;
    } else {
        pagesError.textContent = "";
        pagesInput.classList.remove("error");
        pagesInput.classList.add("valid");
    }

    if (isValid) {
        const readToggle = document.getElementById("readToggle");
        const readValue = readToggle.checked ? "Yes" : "No";

        addBookToLibrary(titleValue, authorValue, parseInt(pagesValue), readValue);
        displayLibrary();

        modal.style.display = "none";
        document.getElementById("newBookForm").reset();
        resetValidationStyles();
        
        alert("Book added successfully!");
    }
});

// Reset validation styles όταν γίνεται reset της φόρμας
document.getElementById("newBookForm").addEventListener("reset", function() {
    resetValidationStyles();
});

// Διαγραφή Βιβλίων
document.querySelector(".libraryDisplay").addEventListener("click", function (e) {
    console.log("Clicked!");

    if (e.target.classList.contains("remove")) {
        let bookDiv = e.target.closest(".item");
        let bookId = bookDiv.dataset.id;
        console.log("Θέλω να διαγράψω το βιβλίο με id:", bookId);

        let index = myLibrary.findIndex(function (book) {
            console.log(`bookId: ${bookId}`);
            return book.id == bookId;
        });
        console.log("Βρέθηκε index:", index);

        if (index !== -1) {
            myLibrary.splice(index, 1);
            console.log("Διέγραψα το βιβλίο με id:", bookId);
        } else {
            console.log("Δεν βρήκα βιβλίο με id:", bookId);
        }

        displayLibrary();
    }
});

// Αλλαγή Κατάστασης Ανάγνωσης/Read
document.querySelector(".libraryDisplay").addEventListener("change", function (e) {
    if (e.target.type === "checkbox" && e.target.dataset.bookId) {
        const bookId = e.target.dataset.bookId;
        const isChecked = e.target.checked;

        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            myLibrary[bookIndex].read = isChecked ? "Yes" : "No";
            console.log(`Άλλαξε το read status του βιβλίου "${myLibrary[bookIndex].title}" σε: ${myLibrary[bookIndex].read}`);
        }
    }
});
let books = [
    {
        title: "",
        author: "",
        read: false,
    }
]

//newRowPosition is being used in the Library AddBook method, so when you add a book to the library, it continues to add to the bottom of the list in an organized fashion.
let newRowPosition = 0;
//bookCount keeps track of how many books are in the library in total. It's for data tracking purposes but serves no functionality.
let bookCount = 1;
//newRowID is how I'm keeping track of which books are paired up with which rows. It's being used in the removeBook method in the Library class.
let newRowID = 1;

class Book {
    constructor (title, author, read, id){
        this.title = title;
        this.author = author;
        this.read = read;
        this.id = id;
    }
    displayBook(){
        console.log(`BOOK TITLE: ${this.title}, AUTHOR NAME: ${this.author}, READ STATUS: ${this.read} and the ID is ${this.id}`)
    }
}

class Library{
    constructor(bookCount, books){
        this.bookCount = bookCount;
        this.books = books;
    }
    markRead(title){
        //I'm giving each book an ID number and also each checkbox an ID. I'm using For loops to loop through each book and checkbox. If the two IDs match, then it will mark that book as "read". This is so that if you need to retroactively mark a book "read" after submitting it to the library, you can. This has no button though and must be called from the console. 
        let booksID = 0;
        for(let i = 0; i<books.length; i++){
            booksID++;
            if(title == books[i].title){
                books[i].read = true;
            }
            if(books[i].read == true){
                let checkboxId = 0;
                let checkboxes = document.querySelectorAll(".checkbox-class");
                for(let i = 0; i<checkboxes.length; i++){
                    checkboxId++;
                    if(checkboxId == booksID){
                        checkboxes[i].checked = true;
                    }
                }
            }
        }
    }
    addBook(){
        let newBook = {};
        bookCount++;
        newRowPosition++;
        let newBookTitle = document.getElementById("title-input").value;
        let newAuthorTitle = document.getElementById("author-input").value;
        let checkboxInput = document.getElementById("checkbox-id");
        var checkboxValue = checkboxInput.checked;    
        newBook[`title`] = newBookTitle;
        newBook[`author`] = newAuthorTitle;
        newBook[`read`] = checkboxValue;
        books.push(newBook);
        let tableBody = document.getElementById("table-body");
        let newRow = tableBody.insertRow(newRowPosition);
        //This set attribute function is how I'm keeping track of which row belongs to which book. This is useful in the removeBook method, so the computer knows which row to remove when you type in the name of a book.
        newRow.setAttribute('id', "new-row-" + newRowID);
        let newCellTitle = newRow.insertCell(0);
        let newCellAuthor = newRow.insertCell(1);
        let newCellRead = newRow.insertCell(2)
        let newTextTitle = document.createTextNode(newBookTitle);
        let newTextAuthor = document.createTextNode(newAuthorTitle);
        let newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox";
        newCellTitle.appendChild(newTextTitle);
        newCellAuthor.appendChild(newTextAuthor);
        newCellRead.appendChild(newCheckbox);
        newRowID++;
        if(checkboxValue === false){
            newCheckbox.checked = false;
            newCheckbox.disabled = true;
        }
        else{
            newCheckbox.checked = true;
            newCheckbox.disabled = true;
        }
    }
    removeBook(){
        let newBookTitle = document.getElementById("title-input").value;
        for(let i = 0; i<books.length; i++){
        if(newBookTitle == books[i].title){
            console.log(newBookTitle);
            console.log(books[i].title);
            //Here is where I'm using the dynamically established IDs to delete the row based on which book title you type in.
            let newRowToDelete = document.getElementById(`new-row-` + i);
            newRowToDelete.remove();
            break;
        }
        }
    }
    }

    // code to execute to enable functionality.
let newLibrary = new Library();
newLibrary.markRead("Name of the Wind");
let submit = document.getElementById("submit");
let remove = document.getElementById("remove");
submit.onclick = newLibrary.addBook;
remove.onclick = newLibrary.removeBook;
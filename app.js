class Book
{
    constructor(id, title, author, read)
    {
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

class Library
{
    constructor()
    {
        this.bookCount = 0;
        this.books = [];
    }

    MarkRead(checkbox, id)
    {
        for(let i = 0; i<this.books.Length; i++)
        {
            if(Book.id == id)
            {
                Book.read = true;
                let checkbox = document.getElementById("checkbox-id");
                checkbox.checked = true;
            }
        }
    }

    AddBook()
    {
        this.bookCount++;
        let titleInput = document.getElementById("title-input").value;
        let authorInput = document.getElementById("author-input").value;
        let checkboxValue = document.getElementById("checkbox-id").checked;
        let newBook = new Book(this.bookCount, titleInput, authorInput, checkboxValue);
        this.books.push(newBook);
        let table = document.getElementById("table-body");
        let newRow = table.insertRow(this.bookCount);
        let titleCell = newRow.insertCell(0);
        titleCell.innerHTML = newBook.title;
        let authorCell = newRow.insertCell(1);
        authorCell.innerHTML = newBook.author;
        let readCell = document.createElement("INPUT");
        readCell.type = "checkbox";
        readCell.checked = newBook.read;
        let readCellInRow = newRow.insertCell(2);
        $(readCellInRow).html(readCell);
        let removeCell = document.createElement("button");
        removeCell.innerText = "Remove";
        let removeCellInRow = newRow.insertCell(3);
        $(removeCellInRow).html(removeCell);
        removeCell.addEventListener("click", () => {
            this.RemoveBook(newBook.id);
        })
    }

    RemoveBook(bookID)
    {
        for(let i = 0; i<this.books.length; i++)
        {
            if(this.books[i].id == bookID)
            {
                let table = document.getElementById("table-body");
                table.deleteRow(this.books[i].id);
                this.books.splice(i, 1);
                this.bookCount--;
            }
        }
        for(let i = 1; i<this.books.length; i++)
        {
            this.books[i].id = i;
        }
        console.log(this.books);
    }
}

let submit = document.getElementById("submit");
let newLibrary = new Library();
submit.addEventListener("click", function() {
    newLibrary.AddBook();
  });
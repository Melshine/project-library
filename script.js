const myLibrary = [];

function Book(title, author, pages, done) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.done = done
}


const COLORS = ["#d35400", "#8e44ad",
    "#2980b9", "#16a085", "#c0392b", "#B33771",
    "#182C61", "#FC427B", "#BDC581"]

function randomColor() {

    const r = Math.floor(Math.random() * COLORS.length)
    return COLORS[r]
}

function randomHeight() {
    return Math.floor(Math.random() * 100 + 120)
}

function getWidth(pages) {
    const width = Math.floor(pages / 5)
    if (width < 20) return 20
    if (width > 150) return 150
    return width
}

const shelf = document.querySelector('.shelf')

shelf.addEventListener('wheel', event => {
    event.preventDefault()
    delta = event.wheelDelta
    if (delta > 0) shelf.scrollBy({ left: delta, behavior: 'smooth' })
    else shelf.scrollBy({ left: delta, behavior: 'smooth' })
})

function addBookToLibrary(title, author, pages, done) {
    const book = new Book(title, author, pages, done)
    myLibrary.push(book)
    const bookElement = document.createElement('div')
    bookElement.classList.add('book')
    if (done) bookElement.classList.add('done')
    bookElement.textContent = book.title
    bookElement.style.height = `${randomHeight()}px`
    bookElement.style.width = `${getWidth(book.pages)}px`
    bookElement.setAttribute('data-id', book.id)
    book.color = randomColor()
    bookElement.style.backgroundColor = `${book.color}`
    if (done) bookElement.style.backgroundColor = 'lightgray'
    shelf.appendChild(bookElement)
}


const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281 },
    { title: "1984", author: "George Orwell", pages: 328 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180 },
    { title: "Brave New World", author: "Aldous Huxley", pages: 268 },
    { title: "Moby-Dick", author: "Herman Melville", pages: 635 },
    { title: "Pride and Prejudice", author: "Jane Austen", pages: 279 },
    //   { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 277 },
    //   { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310 },
    //   { title: "Fahrenheit 451", author: "Ray Bradbury", pages: 194 },
    //   { title: "The Road", author: "Cormac McCarthy", pages: 287 },
];


for (let book of books) {
    addBookToLibrary(book.title, book.author, book.pages, false)
}

const afterShelf = document.querySelector('shelf::after')

const dialog = document.querySelector('dialog')
const form = document.querySelector('form')
const add = document.querySelector('.add')

add.addEventListener('click', event => {
    book_update = undefined
    dialog.querySelector('#data-id').removeAttribute('value')
    dialog.querySelector('#title').value = ''
    dialog.querySelector('#author').value = ''
    dialog.querySelector('#pages').value = 0
    dialog.querySelector('#done').checked = false
    dele.classList.add('hidden')
    dialog.showModal()
})

shelf.addEventListener('click', event => {
    if (event.target.classList.contains('book')) {
        load(event.target)
        book_update = event.target.getAttribute('data-id')
        dele.classList.remove('hidden')
        dialog.showModal();
    }
})

function load(bookElement) {
    const id = bookElement.getAttribute('data-id')
    const book = myLibrary.find(book => book.id === id)

    dialog.querySelector('#data-id').value = book.id
    dialog.querySelector('#title').value = book.title
    dialog.querySelector('#author').value = book.author
    dialog.querySelector('#pages').value = book.pages
    dialog.querySelector('#done').checked = book.done
}

let book_update;

function saveBook() {
    const id = dialog.querySelector('#data-id').value
    const title = dialog.querySelector('#title').value
    const author = dialog.querySelector('#author').value
    const pages = +dialog.querySelector('#pages').value
    const done = dialog.querySelector('#done').checked

    console.log('id', id)

    if (id === undefined || id === '') {
        addBookToLibrary(title, author, pages, done)
    } else {
        const bookElement = shelf.querySelector(`[data-id="${id}"]`)
        bookElement.textContent = title
        const book = myLibrary.find(book => book.id === id)
        book.title = title
        book.author = author
        book.pages = pages
        book.done = done
        if (done) {
            bookElement.style.backgroundColor = 'lightgrey'
        }
        else {
            bookElement.style.backgroundColor = book.color;
        }
        bookElement.style.width = `${getWidth(book.pages)}px`
        console.log(bookElement)
    }
}

const save = document.querySelector('.save')
save.addEventListener('click', event => {
    if(form.checkValidity()){
        saveBook()
        dialog.close()
        event.preventDefault()
    }
})

const cancel = document.querySelector('.cancel')
cancel.addEventListener('click', event => {
    event.preventDefault()
    dialog.close()
})

dialog.addEventListener('mousedown', event => {
    if (event.target == dialog) {
        dialog.close()
    }
    // event.stopPropagation()

})

const dele = document.querySelector('.delete')
dele.addEventListener('click', event => {
    event.preventDefault()
    if (book_update) {
        const book = shelf.querySelector(`[data-id="${book_update}"]`)
        book.parentElement.removeChild(book)
    }
    dialog.close()
})

// dialog.showModal();
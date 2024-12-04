const express = require('express')
const app = express()

const {intializeDataBase} = require("./db/db.connect")
const books = require('./models/books.models')
const { trusted } = require('mongoose')

app.use(express.json())
intializeDataBase();

// Question 1 and 2
const createBookData = async(newBookData) => {
    try{
        const newBook = new books(newBookData)
        const savedBook = newBook.save()
        return savedBook
    }
    catch(error){
        throw error
    }
}

app.post('/books', async(req,res) => {
    try{
const newData = await  createBookData(req.body)
res.status(201).json({message: 'Book added successfully.',newData})
res.status()
    }
    catch(error){
        res.status(500).json({error: 'Failed to add book data.'})
    }
})


// question 3
const readAllBooks = async() => {
    try{
const allBooks = await books.find()
return allBooks
    }
    catch(error){
        throw error
    }
}
readAllBooks()

app.get('/books', async (req, res) => {
   try{
const Books = await readAllBooks()
if(Books.length != 0){
    res.json(Books)
}else{
res.status(404).json('Data is empty')
}
   }
   catch(error){
    res.status(500).json({error: 'Faield to get data.'})
   }
})

// question 4

const getBooksByTitle = async(bookTitle) => {
    try{
const bookByTitle = await books.findOne({title: bookTitle})
return bookByTitle
    }
    catch(error){
        throw error
    }
}

app.get('/books/:title',async(req, res) => {
    try{
const bookData = await getBooksByTitle(req.params.title)
if(bookData){
    res.status(201).json(bookData)
}
else{
    res.status(404).json({error: 'Book not found.'})
}
    }
    catch(error){
        res.status(500).json({error: 'Faield to get book data.'})
    }
})

// question 5

const getBooksByAuthor = async(authorName) => {
    try{
const bookByAuthor = await books.find({author: authorName})
return bookByAuthor
    }
    catch(error){
       throw error
    }
}

app.get('/books/author/:author', async(req, res) => {
    try{
    const authorBooks = await getBooksByAuthor(req.params.author)
    if(authorBooks.length != 0){
        res.json(authorBooks)
    }
    else{
        res.status(404).json({error: 'Books not found.'})
    }
    }
    catch(error){
res.status(500).json({error: 'Faield to get books.'})
    }
})

// Question 6
const booksByGenre = async(genreType) => {
    try{
const bookWithGenre = await books.find({genre: genreType})
return bookWithGenre
    }
    catch(error){
        throw error
    }
}

app.get('/books/genre/:genre',async (req, res) => {
    try{
const bookGenre = await booksByGenre(req.params.genre)
if(bookGenre.lenght != 0) {
    res.status(201).json(bookGenre)
}else{
    res.status(404).json({error: 'Book not found.'})
}
    }
    catch(error){
        res.status(500).json({error: 'Faield to get books data.'})
    }
})

// Question 7
const getBooksByReleaseYear = async(releaseYear) => {
    try{
const booksReleased = await books.find({publishedYear: releaseYear})
return booksReleased
}
    catch(error){
        throw error
    }
}

app.get('/books/publishedYear/:year',async (req, res) => {
    try{
const books = await getBooksByReleaseYear(req.params.year)
if(books.length != 0){
    res.json(books)
}else{
    res.status(404).json({error: 'Books not found.'})
}
    }
    catch(error){
        res.status(500).json({error: "Faield to get book data."})
    }
})

// Question 8
const updateRating = async(id, updateData) => {
    try{
const updateRating = await books.findByIdAndUpdate(id, updateData, {new: true})
return updateRating
    }
    catch(error){
        throw error
    }
}

app.post('/books/bookId/:id',async(req, res) => {
    try{
const updateData = await updateRating(req.params.id, req.body)
if(updateData){
res.status(201).json({message: 'Book rating successfully updated',updateData})
 }else{
    res.status(404).json({error: "Book does not exist."})
 }
 }
    catch(error){
        res.status(500).json({error: 'Book rating updation faield.'})
    }
})

// question 9
const updateByTitle = async(title, dataToUpdate) => {
try{
const updatedData = await books.findOneAndUpdate({title}, dataToUpdate, {new: true})
return updatedData
}
catch(error){
    throw error
}
}

app.post('/books/bookTitle/:title', async(req, res) => {
    try{
const updateBookData = await updateByTitle(req.params.title, req.body)
if(updateBookData){
    res.status(200).json({message: 'Data updated succefully.',updateBookData})
}else{
    res.status(404).json({error: "Book does not exist."})
}
}
    catch(error){
        res.status(500).json({error: "Faield to update data."})
    }
})



// Question 10
const deleteBookById = async(id) => {
    try{
const deleteBook = books.findByIdAndDelete(id)
return deleteBook
    }
    catch(error){
        throw error
    }
}

app.delete('/books/bookId/:id', async(req, res) => {
    try{
const deltedBook = await deleteBookById(req.params.id)
if(deltedBook){
    res.status(200).json({message: 'Book deleted successfully', deltedBook})
}
else{
    res.status(404).json({error: 'Book not found.'})
}
}

    catch(error){
        res.status(500).json({error: "Faield to delete book data."})
    }
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})
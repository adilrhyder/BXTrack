//defining books table

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, minLength: 1 },
    author: { type: String, required: true, minLength: 1 },
    no_of_pages: { type: Number, required: true, min: 1 },
    published: { type: Date, required: true },
});

bookSchema.index({ title: 1, author: 1 }, { unique: true });     //composite key where title and author are the two primary fields

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
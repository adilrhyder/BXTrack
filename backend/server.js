//imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/book");
require("dotenv").config({ path: "../.env" });
const cors = require("cors"); //we won't get cors errors tied to header info if we use this import instead

app.use(express.json()); //parses JSON data
app.use(cors());

app.listen(4000); //backend listening on this port
console.log("Server is listening...");

//connecting to database
var connectionString = `mongodb+srv://adilrhyder:${process.env.DB_PASS}@cluster0.vqiqs5z.mongodb.net/?retryWrites=true&w=majority`;
mongoose
	.connect(connectionString)
	.then((res, req) => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.log(err);
	});

app.post("/add", async (req, res) => {
	console.log("RECEIVED BOOK");
	const { bookTitle, bookAuthor, bookPages, bookPubDate } = req.body;
	try {
		const newBook = await Book.create({
			title: bookTitle,
			author: bookAuthor,
			no_of_pages: bookPages,
			published: bookPubDate,
		});
		res.json(newBook);
		console.log("BOOK ADDED");
	} catch (err) {
		console.log("BOOK NOT ADDED");
		res.status(400).json(err);
	}
});

app.post("/delete", async (req, res) => {
	console.log("DELETING BOOK");
	const delBook = req.body;
	console.log(
		`DELETING BOOK; TITLE: ${delBook.title}, AUTHOR: ${delBook.author}`
	);
	Book.deleteOne({ title: delBook.title, author: delBook.author })
		.then(() => {
			console.log("BOOK DELETED");
		})
		.catch((err) => {
			console.log("BOOK NOT DELETED.");
		});
});

app.post("/list", async (req, res) => {
	console.log("RECEIVED REQUEST FOR BOOKS");
	const bookDoc = await Book.find({});
	res.json(bookDoc);
});

app.post("/edit", async (req, res) => {
	console.log("RECEIVED EDIT REQUEST");
	const { id, bookTitle, bookAuthor, bookPages, bookPubDate } = req.body;

	Book.findOneAndUpdate(
		{ _id: id },
		{
			title: bookTitle,
			author: bookAuthor,
			no_of_pages: bookPages,
			publication: bookPubDate,
		}
	)
		.then(async () => {
			const bookDoc = await Book.find({});
			console.log("BOOK UPDATED");
			res.json(bookDoc);
		})
		.catch((err) => {
			console.log("BOOK NOT UPDATED");
			res.status(400).json(err);
		});
});

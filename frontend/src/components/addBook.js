import React, { useState } from "react";

import DatePicker from "react-datepicker";

function AddBook() {
	//state variables
	const [bookTitle, setBookTitle] = useState("");
	const [bookAuthor, setBookAuthor] = useState("");
	const [bookPages, setBookPages] = useState(0);
	const [bookPubDate, setBookPubDate] = useState(new Date());

	async function handleSubmit(event) {
		event.preventDefault(); //prevent default actions

		console.log("Here.");
		const response = await fetch(`http://localhost:4000/add`, {
			method: "POST",
			body: JSON.stringify({
				bookTitle,
				bookAuthor,
				bookPages,
				bookPubDate,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			setBookTitle("");
			setBookAuthor("");
			setBookPages(0);
			setBookPubDate(new Date());
			alert("Book added successfully!");
		} else {
			alert(
				"Something went wrong. Please enter unique and valid book details!"
			);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="addBookForm">
				<label className="book-title">Title:</label>
				<input
					type="text"
					placeholder="Enter title"
					value={bookTitle}
					required
					onChange={(event) => {
						setBookTitle(event.target.value);
					}}
				/>
				<label className="book-author">Author:</label>
				<input
					type="text"
					placeholder="Enter author name"
					value={bookAuthor}
					required
					onChange={(event) => {
						setBookAuthor(event.target.value);
					}}
				/>
				<label className="book-pages">No. of Pages:</label>
				<input
					type="number"
					placeholder="Enter page count"
					value={bookPages}
					required
					onChange={(event) => {
						setBookPages(event.target.value);
					}}
				/>
				<label className="book-pages">Publication Date:</label>
				<DatePicker
					value={bookPubDate}
					selected={bookPubDate}
					name="bookPubDate"
					dateFormat="MM/dd/yyyy"
					required
					shouldCloseOnSelect={true}
					onChange={setBookPubDate}
				/>

				<button
					className="button"
					style={{ float: "none", margin: "auto" }}
				>
					Submit
				</button>
			</form>
		</>
	);
}

export default AddBook;

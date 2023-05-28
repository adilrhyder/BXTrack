import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";

function EditBook({ bookList, setBookList }) {
	const navigate = useNavigate();
	const { state } = useLocation();

	console.log("Inside edit");
	console.log(state);

	//state variables
	const [bookTitle, setBookTitle] = useState(state.title);
	const [bookAuthor, setBookAuthor] = useState(state.author);
	const [bookPages, setBookPages] = useState(state.no_of_pages);
	const [bookPubDate, setBookPubDate] = useState(new Date(state.published));

	async function handleSubmit(event) {
		event.preventDefault(); //prevent default actions

		if (bookPages > 0) {
			const response = await fetch(`http://localhost:4000/edit`, {
				method: "POST",
				body: JSON.stringify({
					id: state.id,
					bookTitle,
					bookAuthor,
					bookPages,
					bookPubDate,
				}),
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => {
					response.json().then((response) => {
						setBookList(response);
						alert("Book edited successfully!");
						navigate("/");
					});
				})
				.catch(() => {
					alert(
						"Something went wrong. Please enter unique book details!"
					);
				});
		} else {
			alert("Something went wrong. Please enter valid book details!");
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

				<button className="button">Submit Edits</button>
			</form>
		</>
	);
}

export default EditBook;

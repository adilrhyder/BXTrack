import React from "react";
import { useEffect } from "react";
import Book from "./book";

function AllBooks({ bookList, setBookList }) {
	function handleRemoveBook(id) {
		var thisBook;

		for (var i = 0; i < bookList.length; i++) {
			if (bookList[i]._id === id) {
				thisBook = bookList[i];
				break;
			}
		}

		fetch(`http://localhost:4000/delete`, {
			method: "POST",
			body: JSON.stringify(thisBook),
			headers: { "Content-Type": "application/json" },
		});

		setBookList(bookList.filter((book) => book._id !== id));
	}

	useEffect(() => {
		async function getBooks() {
			fetch(`http://localhost:4000/list`, {
				method: "POST",
				// body: JSON.stringify({ bookTitle, bookAuthor, bookPages, bookPubDate }),
				headers: { "Content-Type": "application/json" },
			}).then((response) =>
				response.json().then((response) => {
					setBookList(response);
				})
			);
		}

		getBooks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bookList">
			{bookList.length !== 0 ? (
				// <p>Books are here bro</p>
				bookList.map((book) => (
					<Book
						key={book._id}
						id={book._id}
						title={book.title}
						author={book.author}
						no_of_pages={book.no_of_pages}
						published={book.published}
						handleRemoveBook={handleRemoveBook}
					/>
				))
			) : (
				<></>
			)}
		</div>
	);
}

export default AllBooks;

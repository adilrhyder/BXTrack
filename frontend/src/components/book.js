import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Book({ id, title, author, no_of_pages, published, handleRemoveBook }) {
	const navigate = useNavigate();

	return (
		<Card className="book">
			<Card.Body>
				<Card.Title className="title">{title}</Card.Title>
				<div className="book-details">
					<div>Author: {author}</div>
					<div>Page Count: {no_of_pages} </div>
					<div>
						Publication Date: {new Date(published).toDateString()}
					</div>
				</div>
				<Button
					variant="primary"
					className="button"
					onClick={() => {
						navigate("/edit", {
							state: {
								id,
								title,
								author,
								no_of_pages,
								published,
							},
						});
					}}
				>
					Edit
				</Button>{" "}
				<Button
					variant="danger"
					className="button"
					onClick={() => handleRemoveBook(id)}
				>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
}

export default Book;

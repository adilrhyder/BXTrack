import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<h1>BXTrack Books</h1>
			<div className="linkButtons">
				<Link to="/" className="link">
					All Books
				</Link>
				<Link to="/add" className="link">
					Add A Book
				</Link>
			</div>
		</header>
	);
};

export default Header;

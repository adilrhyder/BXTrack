import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import AddBook from "./components/addBook";
import "react-datepicker/dist/react-datepicker.css";
import EditBook from "./components/editBook";
import AllBooks from "./components/allBooks";

function App() {
	const [bookList, setBookList] = useState([]);
	return (
		<BrowserRouter>
			<div>
				<Header />
				<main>
					<Routes>
						<Route
							path={"/"}
							element={
								<AllBooks
									bookList={bookList}
									setBookList={setBookList}
								/>
							}
						/>
						<Route path={"/add"} element={<AddBook />} />
						<Route
							path={"/edit"}
							element={<EditBook setBookList={setBookList} />}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;

import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const addBook = () => {
    fetch("/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((book) => setBooks((prev) => [...prev, book]));
    setNewBook({ title: "", author: "" });
  };

  return (
    <div>
      <h1>Book Library</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
      <input
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;


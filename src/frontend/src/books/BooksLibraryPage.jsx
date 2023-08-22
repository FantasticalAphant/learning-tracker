import {useEffect, useState} from "react";

export const BooksLibraryPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:8080/books", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                const data = await response.json();
                console.log(data);
                setBooks(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchBooks();
    })

    return (
        <>
            <h1>Books Library</h1>
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.title}</h2>
                    <p>{book.authors.join(', ')}</p>
                    <p>{book.publishedDate}</p>
                    <p>{book.publisher}</p>
                    <p>{book.description}</p>
                    <img src={book.thumbnail} alt={book.title}/>
                </div>
            ))}
        </>
    )
}
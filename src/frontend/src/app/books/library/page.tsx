"use client"

import {useEffect, useState} from "react";
import Shell from "@/components/Shell";
import BookLibrary from "@/components/BookLibrary";

export default function BooksLibraryPage() {
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
    }, [])

    return (
        <Shell highlightedTab={"Books"}>
            <h1>Books Library</h1>
            <BookLibrary books={books}/>
        </Shell>
    )
}
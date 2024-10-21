"use client"

import {useEffect, useState} from "react";
import Shell from "@/components/Shell";
import BookLibrary from "@/components/BookLibrary";
import Link from "next/link";

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
            <div className="flex justify-between mb-5">
                <h1>Library</h1>
                <Link href={"/books"}>Search books</Link>
            </div>
            <BookLibrary books={books}/>
        </Shell>
    )
}
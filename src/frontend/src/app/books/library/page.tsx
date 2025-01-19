"use client"

import {useEffect, useState} from "react";
import Shell from "@/components/Shell";
import BookLibrary from "@/components/books/BookLibrary";
import Link from "next/link";
import {API_URL} from "@/utils/api";

export default function BooksLibraryPage() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/books`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    const deleteBook = async (bookId: number) => {
        try {
            await fetch(`${API_URL}/books/${bookId}`, {
                method: "DELETE",
            });

            fetchBooks();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Shell highlightedTab={"Books"}>
            <div className="flex justify-between mb-5">
                <h1>Library</h1>
                <Link href={"/books"}>Search books</Link>
            </div>
            <BookLibrary books={books} handleDelete={deleteBook} handleUpdate={fetchBooks}/>
        </Shell>
    )
}
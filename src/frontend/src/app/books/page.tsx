"use client"

import {useState} from "react";
import {BookList} from "@/components/books/BookList";
import Link from "next/link";
import Shell from "@/components/Shell";
import {API_URL} from "@/utils/api";

export default function BooksPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API_URL}/books/search?query=${query}&maxResults=20`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });

            const data = await response.json();
            console.log(data.items);
            setResults(data.items || []);

            setQuery("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Shell highlightedTab={"Books"}>
            <div>
                <p className="text-4xl mb-2 text-center">Books</p>
                <Link href="/books/library">
                    Library
                </Link>
            </div>

            <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="book-search" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Book Search
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                        id="book-search"
                        name="book-search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Submit
            </button>

            <div className="mt-5">
                <BookList books={results}/>
            </div>
        </Shell>
    )
}
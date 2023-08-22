import {useState} from "react";
import {Button, InputGroup, Form} from "react-bootstrap";
import {BookList} from "./BookList.jsx";
import {Link} from "react-router-dom";

export const BooksPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/books/search?query=${query}&maxResults=20`, {
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

    // TODO: allow enter to submit form

    return (
        <>
            <div>
                <h1>Books</h1>
                <Link to={"/books/library"}>
                    <Button type="submit" variant="primary">
                        Library
                    </Button>
                </Link>
            </div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Book Title"
                    aria-label="Book Title"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    onKeyDown={event => {
                        // TODO: allow enter to submit form
                        if (event.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                />
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Search
                </Button>
            </InputGroup>

            <div>
                <BookList books={results}/>
            </div>
        </>
    )
}
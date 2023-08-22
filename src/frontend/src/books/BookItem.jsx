import {Button, Card} from "react-bootstrap";

export const BookItem = ({book, index}) => {
    const title = book["volumeInfo"]["title"];
    const authors = book["volumeInfo"]["authors"];
    const image = book["volumeInfo"]["imageLinks"] ? book["volumeInfo"]["imageLinks"]["thumbnail"] : "";
    const link = book["volumeInfo"]["infoLink"];

    const addBook = async() => {

        const postedBook = {
            "isbn": book["volumeInfo"]["industryIdentifiers"][0]["identifier"],
            "title": title,
            "authors": authors,
            "publisher": book["volumeInfo"]["publisher"],
            "publishedDate": book["volumeInfo"]["publishedDate"],
            "description": book["volumeInfo"]["description"],
            "thumbnail": image,
        }

        try {
            const response = await fetch("http://localhost:8080/books", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(postedBook),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card style={{ width: '10rem' }} key={index}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {authors.join(', ')}
                </Card.Text>
                <Card.Link href={link}>Link</Card.Link>

                <Button type="submit" variant="primary" onClick={addBook}>
                    Add
                </Button>
            </Card.Body>
        </Card>
    );
}
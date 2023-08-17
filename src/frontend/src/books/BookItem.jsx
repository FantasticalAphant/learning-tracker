import {Card} from "react-bootstrap";

export const BookItem = ({book, index}) => {
    const title = book["volumeInfo"]["title"];
    const authors = book["volumeInfo"]["authors"];
    const image = book["volumeInfo"]["imageLinks"] ? book["volumeInfo"]["imageLinks"]["thumbnail"] : "";
    const link = book["volumeInfo"]["infoLink"];

    return (
        <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {authors.join(', ')}
                </Card.Text>
                <Card.Link href={link}>Link</Card.Link>
            </Card.Body>
        </Card>
    );
}
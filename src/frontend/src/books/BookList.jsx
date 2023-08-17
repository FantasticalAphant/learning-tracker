import {BookItem} from "./BookItem.jsx";
import {Row} from "react-bootstrap";

export const BookList = ({books}) => {
    return (
        <>
            <Row xs={1} md={2} lg={3} className="g-4">
                {books.map((book, index) =>
                    <BookItem book={book} index={index}/>
                )}
            </Row>
        </>
    )
}
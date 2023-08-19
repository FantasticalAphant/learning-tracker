import {Badge, Dropdown, ListGroup, Modal} from "react-bootstrap";
import {useState} from "react";

export const ArticleList = ({articles, onArticleDeleted}) => {
    const [show, setShow] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (url) => {
        setCurrentArticle(url);
        setShow(true);
    }

    const deleteArticle = async (articleUrl) => {
        try {
            const response = await fetch(`http://localhost:8080/article?url=${articleUrl}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            onArticleDeleted();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ListGroup>
                {articles.map(article => (
                    <ListGroup.Item key={article.url}>
                        <a href={article.url}>{article.title}</a>
                        <br/>
                        {/*TODO: add tags/topics*/}
                        <Badge pill bg="primary">
                            Primary
                        </Badge>
                        <Dropdown className="float-end">
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                Actions
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#rename">Rename</Dropdown.Item>
                                <Dropdown.Item href="#delete" onClick={() => handleShow(article.url)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/*NOTE: move out of ListGroup to prevent black backdrop*/}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={() => {handleClose(); deleteArticle(currentArticle)}}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
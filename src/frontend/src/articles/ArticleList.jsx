import {Badge, Dropdown, Form, ListGroup, Modal} from "react-bootstrap";
import {useState} from "react";

export const ArticleList = ({articles, onArticleUpdated}) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleClose1 = () => setShowModal1(false);
    const handleClose2 = () => setShowModal2(false);

    const handleShow1 = (url) => {
        setCurrentArticle(url);
        setShowModal1(true);
    }

    const handleShow2 = (url) => {
        setCurrentArticle(url);
        setShowModal2(true);
    }

    const fetchTopics = async (url) => {
        try {
            const [allTopicsResponse, currentTopicsResponse] = await Promise.all([
                fetch("http://localhost:8080/topics"),
                fetch(`http://localhost:8080/article/topics?url=${url}`)]
            )

            const topics = await allTopicsResponse.json();
            const selectedTopics = await currentTopicsResponse.json();

            setTopics(topics);
            setSelectedTopics(selectedTopics);
        } catch (error) {
            console.log(error);
        }
    }

    const updateTopics = async () => {
        try {
            const response = await fetch(`http://localhost:8080/article/topics?url=${currentArticle}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedTopics)
            });

            onArticleUpdated();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckboxChange = (checked, topicId) => {
        if (checked) {
            setSelectedTopics([...selectedTopics, topicId]);
        } else {
            setSelectedTopics(selectedTopics.filter(id => id !== topicId));
        }
    }

    const deleteArticle = async (articleUrl) => {
        try {
            const response = await fetch(`http://localhost:8080/article?url=${articleUrl}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            onArticleUpdated();
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
                                <Dropdown.Item onClick={() => {handleShow2(article.url); fetchTopics(article.url)}}>Update Tags</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleShow1(article.url)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/*NOTE: move out of ListGroup to prevent black backdrop*/}
            <Modal show={showModal1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose1}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={() => {handleClose1(); deleteArticle(currentArticle)}}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {topics.map(topic => (
                        <div key={topic.id}>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedTopics.includes(topic.id)}
                                    label={topic.name}
                                    onChange={(e) => handleCheckboxChange(e.target.checked, topic.id)}
                                />
                            </Form>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose2}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={() => {handleClose2(); updateTopics()}}>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
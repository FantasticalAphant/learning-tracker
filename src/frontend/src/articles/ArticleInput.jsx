import {Button, Form, InputGroup} from "react-bootstrap";
import {useState} from "react";

export const ArticleInput = ({onArticleAdded}) => {
    const [articleUrl, setArticleUrl] = useState("")

    const handleSubmit = async () => {

        try {
            const newArticle = {url: articleUrl};

            const response = await fetch("http://localhost:8080/articles", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newArticle)
            });

            onArticleAdded();

            setArticleUrl("")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Article URL"
                    aria-label="Article URL"
                    value={articleUrl}
                    onChange={event => setArticleUrl(event.target.value)}
                />
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </InputGroup>
        </>
    )
}
import {ListGroup} from "react-bootstrap";

export const ArticleList = ({articles}) => {
    return (
        <>
            <ListGroup>
                {articles.map(article => (
                    <ListGroup.Item key={article.url}>
                        <a href={article.url}>{article.title}</a>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}
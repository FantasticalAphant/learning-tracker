import {Badge, ListGroup} from "react-bootstrap";

export const ArticleList = ({articles}) => {
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
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}
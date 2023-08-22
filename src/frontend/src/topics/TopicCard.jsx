import {Card} from "react-bootstrap";

export const TopicCard = ({topic}) => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{topic["name"]}</Card.Title>
                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                    <Card.Text>
                        {topic["description"]}
                    </Card.Text>
                    <Card.Link href={`/topics/${topic["id"]}`}>View</Card.Link>
                </Card.Body>
            </Card>
        </>
    )
}
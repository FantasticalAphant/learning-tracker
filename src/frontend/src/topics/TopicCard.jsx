import {Card} from "react-bootstrap";

export const TopicCard = ({topic, onTopicsAdded}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/topics/${topic["id"]}`, {
                method: "DELETE",
            });

            onTopicsAdded();
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{topic["name"]}</Card.Title>
                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                    <Card.Text>
                        {topic["description"]}
                    </Card.Text>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Card.Link href={`/topics/${topic["id"]}`}>View</Card.Link>
                        <Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
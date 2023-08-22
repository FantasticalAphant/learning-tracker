import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const IndividualTopicPage = () => {
    const {id} = useParams();
    const [topic, setTopic] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const [responseTopic, responseArticles] = await Promise.all([
                    fetch(`http://localhost:8080/topics/${id}`),
                    fetch(`http://localhost:8080/articles/topic/${id}`)
                ]);

                const topic = await responseTopic.json();
                const articles = await responseArticles.json();

                setTopic(topic);
                setArticles(articles);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopic().then(r => console.log(r));
    }, [])

    return (
        <>
            <h1>{topic["name"]}</h1>
            <p>{topic["description"]}</p>
            {articles.map(article => (
                <div key={article["id"]}>
                    <h2>{article["title"]}</h2>
                    <p>{article["content"]}</p>
                </div>
            ))}
        </>
    )

}
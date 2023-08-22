import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const IndividualTopicPage = () => {
    const {id} = useParams();
    const [topic, setTopic] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const [topicResponse, articlesResponse] = await Promise.all([
                    fetch(`http://localhost:8080/topics/${id}`),
                    fetch(`http://localhost:8080/articles/topic/${id}`)
                ]);

                const topic = await topicResponse.json();
                const articles = await articlesResponse.json();

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

            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article["id"]}>
                    <h2>{article["title"]}</h2>
                    <p>{article["content"]}</p>
                </div>
            ))}

            <h1>Books</h1>

            <h1>Videos</h1>
        </>
    )

}
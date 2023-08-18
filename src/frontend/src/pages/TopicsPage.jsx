import {useState, useEffect} from 'react'

export const TopicsPage = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await fetch("http://localhost:8080/topics");
                const topics = await response.json();
                setTopics(topics);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopics().then(r => console.log(r));
    }, [])

    return (
        <>
            <h1>Topics</h1>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>{topic.name}</li>
                ))}
            </ul>
        </>
    )
}
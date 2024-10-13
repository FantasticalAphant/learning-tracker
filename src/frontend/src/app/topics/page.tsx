"use client"

import {useEffect, useState} from 'react'
import {TopicCard} from "@/components/TopicCard.jsx";
import {TopicInput} from "@/components/TopicInput";
import Shell from "@/components/Shell";

export default function TopicsPage() {
    const [topics, setTopics] = useState([]);

    const fetchTopics = async () => {
        try {
            const response = await fetch("http://localhost:8080/topics");
            const topics = await response.json();
            setTopics(topics);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTopics().then(r => console.log(r));
    }, [])

    const handleTopicsChanged = () => {
        fetchTopics();
    }

    return (
        <Shell>
            <h1>Topics</h1>
            <TopicInput onTopicsAdded={handleTopicsChanged}/>
            <ul>
                {topics.map(topic => (
                    <TopicCard key={topic["id"]} topic={topic} onTopicsAdded={handleTopicsChanged}/>
                ))}
            </ul>
        </Shell>
    )
}
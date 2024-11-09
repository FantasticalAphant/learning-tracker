"use client"

import {useEffect, useState} from 'react'
import {TopicCards} from "@/components/TopicCards.jsx";
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
        <Shell highlightedTab={"Topics"}>
            <p className="text-4xl text-center">Topics</p>
            <TopicInput onTopicsAdded={handleTopicsChanged}/>

            <div className="mt-10">
                <TopicCards topics={topics} onTopicsAdded={handleTopicsChanged}/>
            </div>
        </Shell>
    )
}
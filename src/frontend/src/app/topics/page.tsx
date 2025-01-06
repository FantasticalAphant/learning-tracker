"use client"

import {useEffect, useState} from 'react'
import {TopicCards} from "@/components/topics/TopicCards.jsx";
import {TopicInput} from "@/components/topics/TopicInput";
import Shell from "@/components/Shell";
import {useTopics} from "@/contexts/TopicsContext";

export default function TopicsPage() {
    const [topics, setTopics] = useState([]);
    // @ts-ignore
    const {refreshTopics} = useTopics();

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
        refreshTopics();
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
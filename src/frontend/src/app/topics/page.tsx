"use client"

import {useEffect, useState} from 'react'
import {TopicCards} from "@/components/topics/TopicCards.jsx";
import {TopicInput} from "@/components/topics/TopicInput";
import Shell from "@/components/Shell";
import {useTopics} from "@/contexts/TopicsContext";
import {API_URL} from "@/utils/api";

export default function TopicsPage() {
    const [topics, setTopics] = useState([]);
    // @ts-ignore
    const {refreshTopics} = useTopics();

    const fetchTopics = async () => {
        try {
            const response = await fetch(`${API_URL}/topics`);
            const topics = await response.json();
            setTopics(topics);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTopics();
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
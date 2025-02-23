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

            <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">All Topics</span>
                </div>
            </div>

            <div className="mt-10">
                <TopicCards topics={topics} onTopicsAdded={handleTopicsChanged}/>
            </div>
        </Shell>
    )
}
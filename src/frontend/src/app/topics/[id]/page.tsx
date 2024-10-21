"use client"

import {useEffect, useState} from "react";
import Shell from "@/components/Shell";

interface Params {
    params: { id: string; };
}

const tabs = [
    {name: 'All', endpoint: "", current: true},
    {name: 'Articles', endpoint: "/articles", current: false},
    {name: 'Books', endpoint: "/books", current: false},
    {name: 'Videos', endpoint: "/videos", current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function IndividualTopicPage({params}: Params) {
    const {id} = params;
    const [topic, setTopic] = useState([]);
    const [articles, setArticles] = useState([]);
    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the topic separately
    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`http://localhost:8080/topics/${id}`);
                const topic = await response.json();
                setTopic(topic);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTopic();
    }, [id]);

    useEffect(() => {
        const fetchTopic = async () => {
            setIsLoading(true);
            try {
                let endpoints = [];
                if (activeTab.name === "All") {
                    endpoints = ["/articles", "/books", "/videos"];
                } else {
                    endpoints = [activeTab.endpoint];
                }

                const results = await Promise.all(
                    endpoints.map(endpoint => fetch(`http://localhost:8080${endpoint}/topic/${id}`).then(response => response.json()))
                );

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
    }, [id])

    return (
        <Shell highlightedTab={"Topics"}>
            <h1>{topic["name"]}</h1>
            <p>{topic["description"]}</p>

            <h1>Articles</h1>
            {articles && articles.map(article => (
                <div key={article["id"]}>
                    <h2>{article["title"]}</h2>
                    <p>{article["content"]}</p>
                </div>
            ))}

            <h1>Books</h1>

            <h1>Videos</h1>

            <div className="border-b border-gray-200 pb-5 sm:pb-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Candidates</h3>
                <div className="mt-3 sm:mt-4">
                    <div className="sm:hidden">
                        <label htmlFor="current-tab" className="sr-only">
                            Select a tab
                        </label>
                        <select
                            id="current-tab"
                            name="current-tab"
                            defaultValue={tabs.find((tab) => tab.current).name}
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={"#"}
                                    onClick={() => setActiveTab(tab)}
                                    aria-current={tab.current ? 'page' : undefined}
                                    className={classNames(
                                        tab.current
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                                    )}
                                >
                                    {tab.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </Shell>
    )
}
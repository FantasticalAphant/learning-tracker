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

// @ts-ignore
export default function IndividualTopicPage({params}: Params) {
    const {id} = params;
    const [topic, setTopic] = useState([]);
    const [articles, setArticles] = useState([]);
    // const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the topic separately
    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`http://localhost:8080/topics/${id}`);
                const topic = await response.json();
                setTopic(topic);
                console.log(topic);
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
                // let endpoints = [];
                // if (activeTab.name === "All") {
                //     endpoints = ["/articles", "/books", "/videos"];
                // } else {
                //     endpoints = [activeTab.endpoint];
                // }

                // const results = await Promise.all(
                //     endpoints.map(endpoint => fetch(`http://localhost:8080${endpoint}/topic/${id}`).then(response => response.json()))
                // );

                const [articlesResponse, videosResponse] = await Promise.all([
                    fetch(`http://localhost:8080/articles/topic/${id}`),
                    fetch(`http://localhost:8080/videos/topic/${id}`),
                ]);

                const articles = await articlesResponse.json();
                const videos = await videosResponse.json();

                console.log(articles);
                console.log(videos);

                setArticles(articles);
                setVideos(videos);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopic().then(r => console.log(r));
    }, [id, activeTab])

    return (
        <Shell highlightedTab={"Topics"}>
            <div className="pt-5 border-b border-gray-200 pb-5 sm:pb-0">
                <p className="text-4xl font-semibold leading-6 text-gray-900">{topic["name"]}</p>
                <br/>
                <p className="text-xl leading-6 text-gray-900">{topic["description"]}</p>
                <div className="mt-3 sm:mt-4">
                    <div className="sm:hidden">
                        <label htmlFor="current-tab" className="sr-only">
                            Select a tab
                        </label>
                        <select
                            id="current-tab"
                            name="current-tab"
                            defaultValue={tabs.find((tab) => tab.current)?.name}
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
                                    href={"javascript:;"}
                                    onClick={() => setActiveTab(tab)}
                                    aria-current={tab.current ? 'page' : undefined}
                                    className={classNames(
                                        tab.name === activeTab.name
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

            {(activeTab.name === "Articles" || activeTab.name === "All") && articles && articles.map(article => (
                <div key={article["id"]}>
                    <h2>{article["title"]}</h2>
                    <p>{article["content"]}</p>
                </div>
            ))}

            {(activeTab.name === "Videos" || activeTab.name === "All") && videos && videos.map(video => (
                <div key={video["id"]}>
                    <h2>{video["title"]}</h2>
                    <p>{video["description"]}</p>
                </div>
            ))}

        </Shell>
    )
}

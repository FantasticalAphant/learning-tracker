"use client"

import {useEffect, useState} from 'react';
import {ArticleInput} from "@/components/articles/ArticleInput.jsx";
import {ArticleList} from "@/components/articles/ArticleList.jsx";
import Shell from "@/components/Shell";

export default function ArticlesPage() {
    // TODO: check out tanstack-query
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch("http://localhost:8080/articles");
            const articles = await response.json();
            setArticles(articles);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchArticles().then(r => console.log(r));
    }, [])

    const handleArticlesChanged = () => {
        fetchArticles();
    }

    return (
        <Shell highlightedTab={"Articles"}>
            <p className="text-4xl text-center mb-5">Articles</p>

            <ArticleInput onArticleAdded={handleArticlesChanged}/>

            <ArticleList articles={articles} onArticleUpdated={handleArticlesChanged}/>
        </Shell>
    )
}
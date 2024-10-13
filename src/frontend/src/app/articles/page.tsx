"use client"

import {useEffect, useState} from 'react';
import {ArticleInput} from "@/components/ArticleInput.jsx";
import {ArticleList} from "@/components/ArticleList.jsx";
import Shell from "@/components/Shell";

export default function ArticlesPage() {
    // TODO: check out react-query
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
        <Shell>
            <h1>Articles</h1>

            <ArticleInput onArticleAdded={handleArticlesChanged}/>

            <ArticleList articles={articles} onArticleUpdated={handleArticlesChanged}/>
        </Shell>
    )
}
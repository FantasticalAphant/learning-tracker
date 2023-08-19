import { useState, useEffect } from 'react';
import {ArticleInput} from "./ArticleInput.jsx";
import {ArticleList} from "./ArticleList.jsx";

export const ArticlesPage = () => {
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
        <>
            <h1>Articles</h1>

            <ArticleInput onArticleAdded={handleArticlesChanged}/>

            <ArticleList articles={articles} onArticleDeleted={handleArticlesChanged}/>
        </>
    )
}
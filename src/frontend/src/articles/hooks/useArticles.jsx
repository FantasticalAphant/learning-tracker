import {useState} from "react";

export const useArticles = () => {
    const [articles, setArticles] = useState([]);

    const addArticle = (newArticle) => {
        setArticles(prevArticles => [...prevArticles, newArticle])
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch("http://localhost:8080/articles");
            const articles = await response.json();
            setArticles(articles);
        } catch (error) {
            console.log(error);
        }
    };

    return {articles, addArticle, fetchArticles};
}
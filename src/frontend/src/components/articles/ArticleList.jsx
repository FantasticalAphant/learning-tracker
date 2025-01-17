import {useCallback, useState} from "react";
import ArticleDeleteModal from "@/components/articles/ArticleDeleteModal";
import ArticleUpdateTagsModal from "@/components/articles/ArticleUpdateTagsModal";
import {ArticleMenu} from "@/components/articles/ArticleMenu";
import {API_URL} from "@/utils/api";

export const ArticleList = ({articles, onArticleUpdated}) => {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleShow1 = (url) => {
        setCurrentArticle(url);
        setShowModal1(true);
    }

    const fetchTopics = useCallback(async (url) => {
        try {
            const [allTopicsResponse, currentTopicsResponse] = await Promise.all([
                fetch(`${API_URL}/topics`),
                fetch(`${API_URL}/topics?url=${encodeURIComponent(url)}`)]
            )

            const topics = await allTopicsResponse.json();
            const selectedTopicsData = await currentTopicsResponse.json();

            const selectedTopicsArray = typeof selectedTopicsData === 'string'
                ? selectedTopicsData.split(',').filter(Boolean)
                : selectedTopicsData;

            setTopics(topics);
            setSelectedTopics(selectedTopicsArray);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleShow2 = useCallback(async (url) => {
        setCurrentArticle(url);
        await fetchTopics(url);
        setShowModal2(true);
    }, [fetchTopics])


    const updateTopics = async () => {
        try {
            const response = await fetch(`${API_URL}/article/topics?url=${encodeURIComponent(currentArticle)}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedTopics),
            });

            if (!response.ok) {
                throw new Error("Failed to update topics");
            }

            onArticleUpdated();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckboxChange = (checked, topicId) => {
        console.log('Checkbox change:', {checked, topicId});
        console.log('Current selectedTopics:', selectedTopics, typeof selectedTopics);
        if (checked) {
            setSelectedTopics([...selectedTopics, topicId]);
        } else {
            setSelectedTopics(selectedTopics.filter(id => id !== topicId));
        }
    }

    const deleteArticle = async (articleUrl) => {
        try {
            await fetch(`${API_URL}/article?url=${encodeURIComponent(articleUrl)}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });

            onArticleUpdated();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <div className="mt-8 flow-root">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Saved Articles</h1>
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Added On
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Last Accessed
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Website
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {articles.map((article) => (
                                    <tr key={article["url"]}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            <a href={article["url"]}>{article["title"].slice(0, 60)}{article["title"].length > 60 && "..."}</a>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {new Date(article["created"]).toLocaleString()}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Test</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Test</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <ArticleMenu
                                                article={article}
                                                onEdit={handleShow2}
                                                onDelete={handleShow1}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ArticleDeleteModal open={showModal1} setOpen={setShowModal1} deleteArticle={deleteArticle}
                                currentArticle={currentArticle}/>
            <ArticleUpdateTagsModal open={showModal2} setOpen={setShowModal2} topics={topics}
                                    selectedTopics={selectedTopics} handleCheckboxChange={handleCheckboxChange}
                                    updateTopics={updateTopics}/>
        </>
    )
}


import {useCallback, useState} from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import ArticleDeleteModal from "@/components/ArticleDeleteModal";
import ArticleUpdateTagsModal from "@/components/ArticleUpdateTagsModal";

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
                fetch("http://localhost:8080/topics"),
                fetch(`http://localhost:8080/article/topics?url=${encodeURIComponent(url)}`)]
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
        console.log('updateTopics called with:', selectedTopics, typeof selectedTopics);
        try {
            const response = await fetch(`http://localhost:8080/article/topics?url=${encodeURIComponent(currentArticle)}`, {
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
            const response = await fetch(`http://localhost:8080/article?url=${articleUrl}`, {
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
                                        Header #2
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Header #3
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Header #4
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {/*FIXME: weird bug that makes Vue.js page unable to update tags or delete*/}
                                {/*FIXME: doesn't seem to be happening for other articles regardless of position*/}
                                {/*FIXME: also get a maximum update depth exceeded error sometimes*/}
                                {articles.map((article) => (
                                    <tr key={article["url"]}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            <a href={article["url"]}>{article["title"]}</a>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Test</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Test</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Test</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <MenuButton
                                                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                            Actions
                                                            <ChevronDownIcon aria-hidden="true"
                                                                             className="-mr-1 h-5 w-5 text-gray-400"/>
                                                        </MenuButton>
                                                    </div>

                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                    >
                                                        <div className="py-1">
                                                            <MenuItem>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        // I think this fixes the recursion bug but removes UI niceties
                                                                        e.preventDefault();
                                                                        handleShow2(article.url);
                                                                    }}
                                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                                >
                                                                    Edit Tags
                                                                </button>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <a
                                                                    href="#"
                                                                    onClick={() => handleShow1(article["url"])}
                                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                                                >
                                                                    Delete
                                                                </a>
                                                            </MenuItem>
                                                        </div>
                                                    </MenuItems>
                                                </Menu>
                                            </a>
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


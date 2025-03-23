import {XCircleIcon} from "@heroicons/react/16/solid";
import {useCallback, useState} from "react";
import BookUpdateTagsModal from "@/components/books/BookUpdateTagsModal";
import BookDeleteModal from "@/components/books/BookDeleteModal";
import {API_URL} from "@/utils/api";

export default function BookLibrary({books, handleDelete, handleUpdate}) {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [currentBook, setCurrentBook] = useState("");

    const handleCheckboxChange = (checked, topicId) => {
        if (checked) {
            setSelectedTopics([...selectedTopics, topicId]);
        } else {
            setSelectedTopics(selectedTopics.filter(id => id !== topicId));
        }
    }

    const fetchTopics = useCallback(async (url) => {
        try {
            const [allTopicsResponse, currentTopicsResponse] = await Promise.all([
                fetch(`${API_URL}/topics`),
                fetch(`${API_URL}/book/topics?id=${encodeURIComponent(url)}`)]
            )

            const topics = await allTopicsResponse.json();
            const selectedTopicsData = await currentTopicsResponse.json();

            const selectedTopicsArray = typeof selectedTopicsData === 'string'
                ? selectedTopicsData.split(',').filter(Boolean)
                : selectedTopicsData;

            setTopics(topics);
            setSelectedTopics(selectedTopicsArray);
        } catch (error) {
            console.error(error);
        }
    }, [selectedTopics]);


    const updateTopics = async () => {
        try {
            const response = await fetch(`${API_URL}/book/topics?bookId=${encodeURIComponent(currentBook)}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedTopics),
            });

            if (!response.ok) {
                throw new Error("Failed to update topics");
            }

            handleUpdate();
        } catch (error) {
            console.error(error);
        }
    }

    const handleShow1 = (id) => {
        setCurrentBook(id);
        setShowModal1(true);
    }

    const handleShow2 = useCallback(async (url) => {
        setCurrentBook(url);
        await fetchTopics(url);
        setShowModal2(true);
    }, [fetchTopics])


    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book, index) => (
                    <li
                        key={index}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border border-gray-300"
                    >
                        <div className="flex flex-1 flex-col p-3">
                            <button className="w-5" onClick={() => handleShow1(book["isbn"])}>
                                <XCircleIcon/>
                            </button>
                            <img alt="" src={book["thumbnail"]} className="mx-auto h-32 w-32 flex-shrink-0"/>
                            <a href={`https://www.goodreads.com/search?q=${book["isbn"]}`}>
                                <h3 className="mt-6 text-sm font-medium text-gray-900">
                                    {book["title"]}
                                </h3>
                            </a>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">{book["authors"].join(", ")}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-2">
                                    <button onClick={() => handleShow2(book["isbn"])}
                                            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 mb-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {book["topics"].join(" | ") || "No topics"}
                                    </button>
                                </dd>
                            </dl>
                            <div>
                                {book["description"].slice(0, 50)}...
                            </div>
                            <div>
                                {book["publishedDate"]}
                                <br/>
                                {book["publisher"]}
                                <br/>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <BookDeleteModal open={showModal1} setOpen={setShowModal1} currentBook={currentBook}
                             deleteBook={handleDelete}/>
            <BookUpdateTagsModal open={showModal2} setOpen={setShowModal2} topics={topics}
                                 selectedTopics={selectedTopics}
                                 handleCheckboxChange={handleCheckboxChange} updateTopics={updateTopics}/>
        </>
    )
}

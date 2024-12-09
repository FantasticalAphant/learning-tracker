import {XCircleIcon} from "@heroicons/react/16/solid";
import {useCallback, useState} from "react";
import BookUpdateTagModal from "@/components/books/BookUpdateTagModal";
import BookDeleteModal from "@/components/books/BookDeleteModal";

export default function BookLibrary({books, handleDelete, handleUpdate}) {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [currentBook, setCurrentBook] = useState("");

    const handleCheckboxChange = (checked, topicId) => {
        console.log('Checkbox change:', {checked, topicId});
        console.log('Current selectedTopics:', selectedTopics, typeof selectedTopics);
        if (checked) {
            setSelectedTopics([...selectedTopics, topicId]);
        } else {
            setSelectedTopics(selectedTopics.filter(id => id !== topicId));
        }
    }

    const fetchTopics = useCallback(async (url) => {
        try {
            const [allTopicsResponse, currentTopicsResponse] = await Promise.all([
                fetch("http://localhost:8080/topics"),
                fetch(`http://localhost:8080/book/topics?id=${encodeURIComponent(url)}`)]
            )

            const topics = await allTopicsResponse.json();
            const selectedTopicsData = await currentTopicsResponse.json();

            const selectedTopicsArray = typeof selectedTopicsData === 'string'
                ? selectedTopicsData.split(',').filter(Boolean)
                : selectedTopicsData;

            setTopics(topics);
            setSelectedTopics(selectedTopicsArray);
            console.log(selectedTopics)
        } catch (error) {
            console.log(error);
        }
    }, [selectedTopics]);


    const updateTopics = async () => {
        try {
            const response = await fetch(`http://localhost:8080/book/topics?bookId=${encodeURIComponent(currentBook)}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(selectedTopics),
            });

            if (!response.ok) {
                throw new Error("Failed to update topics");
            }

            handleUpdate();
        } catch (error) {
            console.log(error);
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
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book, index) => (
                    <li
                        key={index}
                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                    >
                        <div className="flex flex-1 flex-col p-8">
                            <button className="w-5" onClick={() => handleShow1(book["isbn"])}>
                                <XCircleIcon/>
                            </button>
                            <img alt="" src={book["thumbnail"]} className="mx-auto h-32 w-32 flex-shrink-0"/>
                            <h3 className="mt-6 text-sm font-medium text-gray-900">{book["title"]}</h3>
                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-sm text-gray-500">{book["authors"].join(",")}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-3">
                                    <button onClick={() => handleShow2(book["isbn"])}
                                            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 mb-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        {book["topics"] || "No topics"}
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
            <BookUpdateTagModal open={showModal2} setOpen={setShowModal2} topics={topics}
                                selectedTopics={selectedTopics}
                                handleCheckboxChange={handleCheckboxChange} updateTopics={updateTopics}/>
        </>
    )
}

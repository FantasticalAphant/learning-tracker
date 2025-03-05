import Link from "next/link";
import {useTopics} from "@/contexts/TopicsContext";
import {API_URL} from "@/utils/api";
import TopicDeleteModal from "@/components/topics/TopicDeleteModal";
import {useState} from "react";
import TopicUpdateModal from "@/components/topics/TopicUpdateModal";

export const TopicCards = ({topics, onTopicsAdded}) => {
    const {refreshTopics} = useTopics();
    const [currentTopic, setCurrentTopic] = useState();
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleShow1 = (topicId) => {
        setCurrentTopic(topicId);
        setShowModal1(true);
    }

    const handleShow2 = (topicId) => {
        setCurrentTopic(topicId);
        setShowModal2(true);
    }

    const handleDelete = async (topicId) => {
        try {
            const response = await fetch(`${API_URL}/topics/${topicId}`, {
                method: "DELETE",
            });

            onTopicsAdded();
            refreshTopics();

            if (!response.ok) {
                throw Error("Fetch failed");
            }

            await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async (topicId, name, description) => {
        try {
            const response = await fetch(`${API_URL}/topics/${topicId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name,
                    description: description
                }),
            });

            if (!response.ok) {
                throw Error("PUT failed");
            }

            onTopicsAdded();
        } catch (err) {
            console.error(err);
        }
    }

    // TODO: fix UI bug when description is missing/too long
    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                    <li key={topic["id"]}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 shadow border-2 border-gray-200 transition-all hover:bg-gray-200 hover:border-gray-300">
                        <Link href={`/topics/${topic["id"]}`}>
                            <div className="flex w-full items-center justify-between space-x-6 p-4">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-2xl font-bold">{topic["name"]}</h3>
                                    </div>
                                    <p className="mt-1 truncate min-h-[1.25rem] text-sm text-gray-500">{topic["description"]}</p>
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <Link
                                            href={`#`}
                                            onClick={(e) => {
                                                e.preventDefault(); // don't go to the top of the page
                                                handleShow2(topic);
                                            }}
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center font-medium justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm text-gray-900 bg-blue-300 hover:bg-blue-400 hover:shadow"
                                        >
                                            Update
                                        </Link>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <Link
                                            // a button would probably be better for this case
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault(); // don't go to the top of the page
                                                handleShow1(topic);
                                            }}
                                            className="relative inline-flex w-0 flex-1 items-center font-medium justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm text-gray-900 bg-red-200 hover:bg-red-400 hover:shadow"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <TopicDeleteModal open={showModal1} setOpen={setShowModal1} currentTopic={currentTopic}
                              deleteTopic={handleDelete}/>

            <TopicUpdateModal open={showModal2} setOpen={setShowModal2} currentTopic={currentTopic}
                              updateTopic={handleUpdate}/>
        </>
    )
}
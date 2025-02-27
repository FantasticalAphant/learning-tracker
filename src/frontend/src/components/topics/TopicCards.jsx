import Link from "next/link";
import {useTopics} from "@/contexts/TopicsContext";
import {API_URL} from "@/utils/api";
import TopicDeleteModal from "@/components/topics/TopicDeleteModal";
import {useState} from "react";

export const TopicCards = ({topics, onTopicsAdded}) => {
    const {refreshTopics} = useTopics();
    const [showModal, setShowModal] = useState(false);
    const [currentTopic, setCurrentTopic] = useState();

    const handleShow = (topicId) => {
        setCurrentTopic(topicId);
        setShowModal(true);
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
                                                handleShow(topic["id"]);
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

            <TopicDeleteModal open={showModal} setOpen={setShowModal} currentTopic={currentTopic}
                              deleteTopic={handleDelete}/>
        </>
    )
}
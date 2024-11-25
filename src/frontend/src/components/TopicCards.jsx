import Link from "next/link";
import {useTopics} from "@/contexts/TopicsContext";

export const TopicCards = ({topics, onTopicsAdded}) => {
    const {refreshTopics} = useTopics();

    const handleDelete = async (topicId) => {
        try {
            const response = await fetch(`http://localhost:8080/topics/${topicId}`, {
                method: "DELETE",
            });

            onTopicsAdded();
            refreshTopics();

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    // TODO: fix UI bug when description is missing/too long
    return (
        <>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                    <li key={topic["id"]}
                        className="col-span-1 divide-y divide-gray-200 rounded-md bg-white ring-1 ring-gray-100 shadow hover:bg-gray-50">
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
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm text-gray-900 bg-blue-100 hover:bg-blue-300 hover:shadow"
                                        >
                                            Update
                                        </Link>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <Link
                                            href="#" onClick={() => handleDelete(topic["id"])}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm text-gray-900 bg-red-400 hover:bg-red-500 hover:shadow"
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
        </>
    )
}
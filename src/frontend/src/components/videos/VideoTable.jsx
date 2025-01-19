import {useCallback, useState} from "react";
import VideoUpdateTagsModal from "@/components/videos/VideoUpdateTagsModal";
import VideoDeleteModal from "@/components/videos/VideoDeleteModal";
import {API_URL} from "@/utils/api";

export default function VideoTable({videos, handleDelete, handleUpdate}) {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    const updateTopics = async () => {
        try {
            const response = await fetch(`${API_URL}/video/topics?videoId=${encodeURIComponent(currentVideo)}`, {
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
                fetch(`${API_URL}/video/topics?videoId=${encodeURIComponent(url)}`)]
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

    const handleShow1 = (videoId) => {
        setCurrentVideo(videoId);
        setShowModal1(true);
    }

    const handleShow2 = useCallback(async (videoId) => {
        setCurrentVideo(videoId);
        await fetchTopics(videoId);
        setShowModal2(true);
    }, [fetchTopics])

    return (
        <div>
            <div className="mt-8 flow-root">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Saved Videos</h1>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Channel
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Published Date
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {videos.map((video) => (
                                <tr key={video["videoId"]}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <a href={`https://www.youtube.com/watch?v=${video["videoId"]}`}>
                                            {video["videoTitle"]}
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <a href={`https://www.youtube.com/channel/${video["channelId"]}`}>
                                            {video["channelTitle"]}
                                        </a>
                                    </td>
                                    {/*FIXME: update description*/}
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{video["videoDescription"].slice(0, 50)}...</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(video["publishedAt"]).toLocaleString()}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button onClick={() => handleShow2(video["videoId"])}
                                                className="text-indigo-600 hover:text-indigo-900">
                                            Update <span className="sr-only">, {video["videoTitle"]}</span>
                                        </button>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button type="button" onClick={() => handleShow1(video["videoId"])}
                                                className="text-red-600 hover:text-red-900">
                                            Delete<span className="sr-only">, {video["videoTitle"]}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <VideoDeleteModal open={showModal1} setOpen={setShowModal1} currentVideo={currentVideo}
                              deleteVideo={handleDelete}/>
            <VideoUpdateTagsModal open={showModal2} setOpen={setShowModal2} topics={topics}
                                  selectedTopics={selectedTopics} handleCheckboxChange={handleCheckboxChange}
                                  updateTopics={updateTopics}/>

        </div>
    )
}

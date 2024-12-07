"use client"

import {useEffect, useState} from "react";
import Shell from "@/components/Shell";
import VideoTable from "@/components/videos/VideoTable";

export default function VideosPage() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);

    const fetchSavedVideos = async () => {
        try {
            const response = await fetch("http://localhost:8080/videos", {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            const data = await response.json();
            setSavedVideos(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSavedVideos();
    }, [videos])

    const handleSubmit = async () => {
        const videoId = videoUrl.split("v=")[1].split("&")[0];

        try {
            const response = await fetch(`http://localhost:8080/videos?id=${videoId}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });

            const data = await response.json();
            setVideos(data.items);

            setVideoUrl("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (videoId: string) => {
        await fetch(`http://localhost:8080/videos?id=${videoId}`, {
            method: "DELETE"
        })
        fetchSavedVideos();
    }

    return (
        <Shell highlightedTab={"Videos"}>
            <p className="text-4xl text-center mb-3">Videos</p>
            <div>
                <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                    Add video
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <input
                        id="text"
                        name="text"
                        type="text"
                        value={videoUrl}
                        onChange={event => setVideoUrl(event.target.value)}
                        onKeyDown={event => {
                            // TODO: allow enter to submit form
                            if (event.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        placeholder="Video URL"
                        className="block w-3/6 rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!videoUrl.trim()}
                        className={`relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 ${videoUrl.trim() ? "bg-indigo-600 hover:bg-indigo-500 " : "bg-indigo-300 cursor-not-allowed"}`}
                    >
                        Add
                    </button>
                </div>
            </div>

            <VideoTable videos={savedVideos} handleDelete={handleDelete}/>
        </Shell>
    )
}
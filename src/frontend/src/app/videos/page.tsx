"use client"

import {Button, Form, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import Shell from "@/components/Shell";

export default function VideosPage() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [savedVideos, setSavedVideos] = useState([]);

    useEffect(() => {
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
        fetchSavedVideos();
    }, [])

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

    return (
        <Shell>
            <h1>Videos</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Video URL"
                    aria-label="Video URL"
                    value={videoUrl}
                    onChange={event => setVideoUrl(event.target.value)}
                    onKeyDown={event => {
                        // TODO: allow enter to submit form
                        if (event.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                />
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </InputGroup>

            {videos.map((video, index) =>
                <div key={index}>
                    <h2>{video["snippet"]["title"]}</h2>
                    <h2>{video["snippet"]["channelTitle"]}</h2>
                </div>
            )}

            <h1>Saved</h1>
            {savedVideos.map((video, index) =>
                <div key={index}>
                    <a href={`https://www.youtube.com/watch?v=${video["videoId"]}`}>
                        <h2>Video: {video["videoTitle"]}</h2>
                    </a>
                    <a href={`https://www.youtube.com/channel/${video["channelId"]}`}>
                        <h2>Channel: {video["channelTitle"]}</h2>
                    </a>
                    <br/>
                </div>
            )}

        </Shell>
    )
}
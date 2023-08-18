import {Button, InputGroup, Form} from "react-bootstrap";
import {useState} from "react";

export const VideosPage = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [videos, setVideos] = useState([]);

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
        <>
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

        </>
    )
}
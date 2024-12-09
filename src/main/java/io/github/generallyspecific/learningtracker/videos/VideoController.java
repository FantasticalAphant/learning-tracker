package io.github.generallyspecific.learningtracker.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {
    private final VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("/videos")
    public List<Video> getVideos() {
        return videoService.getVideos();
    }

    @PostMapping("/videos")
    public VideoResponse getVideo(@RequestParam String id) {
        return videoService.getVideo(id);
    }

    @DeleteMapping("/videos")
    public void deleteVideo(@RequestParam String id) {
        videoService.deleteVideo(id);
    }

    @GetMapping("/videos/topic/{topicId}")
    public List<Video> getVideosByTopic(@PathVariable UUID topicId) {
        return videoService.getVideosByTopic(topicId);
    }

    @GetMapping("/video/topics")
    public List<UUID> getTopicsForVideo(@RequestParam String videoId) {
        return videoService.getTopicsForVideo(videoId);
    }

    @PutMapping("/video/topics")
    public void addTopicsToVideo(@RequestParam String videoId, @RequestBody List<UUID> topicIds) {
        videoService.addTopicsToVideo(videoId, topicIds);
    }
}

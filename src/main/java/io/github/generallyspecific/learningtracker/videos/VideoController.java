package io.github.generallyspecific.learningtracker.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
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
}

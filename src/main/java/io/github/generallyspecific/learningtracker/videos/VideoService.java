package io.github.generallyspecific.learningtracker.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoService {
    private final VideoRepository videoRepository;
    private final VideoClient videoClient;

    @Autowired
    public VideoService(VideoRepository videoRepository, VideoClient videoClient) {
        this.videoRepository = videoRepository;
        this.videoClient = videoClient;
    }

    public VideoResponse getVideo(String id) {
        return videoClient.getVideo(id);
    }
}

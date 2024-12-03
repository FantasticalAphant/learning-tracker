package io.github.generallyspecific.learningtracker.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
        VideoResponse videoResponse = videoClient.getVideo(id);
        List<Item> items = videoResponse.getItems();
        Item item = items.get(0);

        String videoId = item.getId();
        String videoTitle = item.getSnippet().getTitle();
        String videoDescription = item.getSnippet().getDescription();
        String chanelId = item.getSnippet().getChannelId();
        String channelTitle = item.getSnippet().getChannelTitle();
        Instant publishedAt = Instant.parse(item.getSnippet().getPublishedAt());

        Video video = new Video(videoId, videoTitle, videoDescription, chanelId, channelTitle, publishedAt, new ArrayList<>());
        videoRepository.save(video);

        return videoResponse;
    }

    public List<Video> getVideos() {
        return videoRepository.findAll();
    }

    public List<Video> getVideosByTopic(UUID topicId) {
        return videoRepository.findAllByTopic(topicId);
    }

    public void addTopicsToVideo(String videoId, List<UUID> topicIds) {
        videoRepository.findById(videoId).ifPresent(video -> {
            video.setTopics(topicIds);
            videoRepository.save(video);
        });
    }

    public List<UUID> getTopicsForVideo(String videoId) {
        return videoRepository.findById(videoId).map(Video::getTopics).orElse(new ArrayList<>());
    }

    public void deleteVideo(String id) {
        videoRepository.deleteById(id);
    }
}

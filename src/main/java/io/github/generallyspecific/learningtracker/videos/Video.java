package io.github.generallyspecific.learningtracker.videos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Document(collection="videos")
public class Video {
    @Id
    private String videoId;
    private String videoTitle;
    private String videoDescription;
    private String channelId;
    private String channelTitle;
    private Instant publishedAt;

    private List<UUID> topics;

    public Video(String videoId, String videoTitle, String videoDescription, String channelId, String channelTitle, Instant publishedAt, List<UUID> topics) {
        this.videoId = videoId;
        this.videoTitle = videoTitle;
        this.videoDescription = videoDescription;
        this.channelId = channelId;
        this.channelTitle = channelTitle;
        this.publishedAt = publishedAt;
        this.topics = topics;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getVideoTitle() {
        return videoTitle;
    }

    public void setVideoTitle(String videoTitle) {
        this.videoTitle = videoTitle;
    }

    public String getVideoDescription() {
        return videoDescription;
    }

    public void setVideoDescription(String videoDescription) {
        this.videoDescription = videoDescription;
    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getChannelTitle() {
        return channelTitle;
    }

    public void setChannelTitle(String channelTitle) {
        this.channelTitle = channelTitle;
    }

    public Instant getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public List<UUID> getTopics() {
        return topics;
    }

    public void setTopics(List<UUID> topics) {
        this.topics = topics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Video video = (Video) o;
        return Objects.equals(videoId, video.videoId) && Objects.equals(videoTitle, video.videoTitle) && Objects.equals(videoDescription, video.videoDescription) && Objects.equals(channelId, video.channelId) && Objects.equals(channelTitle, video.channelTitle) && Objects.equals(publishedAt, video.publishedAt) && Objects.equals(topics, video.topics);
    }

    @Override
    public int hashCode() {
        return Objects.hash(videoId, videoTitle, videoDescription, channelId, channelTitle, publishedAt, topics);
    }

    @Override
    public String toString() {
        return "Video{" +
                "videoId='" + videoId + '\'' +
                ", videoTitle='" + videoTitle + '\'' +
                ", videoDescription='" + videoDescription + '\'' +
                ", channelId='" + channelId + '\'' +
                ", channelTitle='" + channelTitle + '\'' +
                ", publishedAt=" + publishedAt +
                ", topics=" + topics +
                '}';
    }
}

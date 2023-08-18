package io.github.generallyspecific.learningtracker.videos;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection="videos")
public class Video {
    @Id
    private String videoId;
    private String videoTitle;
    private String videoDescription;
    private String channelId;
    private String channelTitle;
    private Instant publishedAt;
}

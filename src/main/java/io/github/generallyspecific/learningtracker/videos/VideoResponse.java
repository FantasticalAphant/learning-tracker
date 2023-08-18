package io.github.generallyspecific.learningtracker.videos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VideoResponse {
    List<Item> items;
    private PageInfo pageInfo;
}

@Getter
@Setter
class Item {
    private String id;
    private Snippet snippet;
    private ContentDetails contentDetails;
    private Statistics statistics;
}

@Getter
@Setter
class Snippet {
    private String publishedAt;
    private String channelId;
    private String title;
    private String description;
    private Thumbnails thumbnails;
    private String channelTitle;
    private List<String> tags;
}

@Getter
@Setter
class Thumbnails {
    private Thumbnail defaultThumbnail;
    private Thumbnail medium;
    private Thumbnail high;
    private Thumbnail standard;
    private Thumbnail maxRes;
}

@Getter
@Setter
class Thumbnail {
    private String url;
    private Integer width;
    private Integer height;
}

@Getter
@Setter
class ContentDetails {
    private String duration;
}

@Getter
@Setter
class Statistics {
    private String viewCount;
    private String likeCount;
    private String favoriteCount;
    private String commentCount;
}

@Getter
@Setter
class PageInfo {
    private Integer totalResults;
    private Integer resultsPerPage;
}
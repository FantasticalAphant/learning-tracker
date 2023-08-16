package io.github.generallyspecific.learningtracker.articles;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection="articles")
public class Article {
    @Id
    private String url;
    private String title;
    private String site;
    private Instant created;
}

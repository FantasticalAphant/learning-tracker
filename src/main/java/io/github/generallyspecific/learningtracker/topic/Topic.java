package io.github.generallyspecific.learningtracker.topic;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;


@Data
@Document(collection="topics")
public class Topic {
    @Id
    private UUID id;
    private String name;
    private String description;
}

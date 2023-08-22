package io.github.generallyspecific.learningtracker.books;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection="books")
public class Book {
    @Id
    private String isbn;

    private String title;
    private List<String> authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private String thumbnail;

    private List<String> topics;
}

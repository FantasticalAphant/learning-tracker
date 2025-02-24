package io.github.generallyspecific.learningtracker.books;

import java.util.List;

public record BookWithTopicNames(
        String isbn,
        String title,
        List<String> authors,
        String publisher,
        String publishedDate,
        String description,
        String thumbnail,
        List<String> topics
) {
    public static BookWithTopicNames fromBook(Book book, List<String> topicNames) {
        return new BookWithTopicNames(
                book.getIsbn(),
                book.getTitle(),
                book.getAuthors(),
                book.getPublisher(),
                book.getPublishedDate(),
                book.getDescription(),
                book.getThumbnail(),
                topicNames // only thing that needs to be updated is topics
        );
    }
}

package io.github.generallyspecific.learningtracker.books;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BookRepository extends MongoRepository<Book, String> {
    @Query(value = "{ 'topics' : ?0 }")
    List<Book> findAllByTopic(UUID topicId);
}

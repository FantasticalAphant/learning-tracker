package io.github.generallyspecific.learningtracker.books;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface BookRepository extends MongoRepository<Book, UUID> {
}

package io.github.generallyspecific.learningtracker.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookClient bookClient;

    @Autowired
    public BookService(BookRepository bookRepository, BookClient bookClient) {
        this.bookRepository = bookRepository;
        this.bookClient = bookClient;
    }

    public BookResponse search(String query, Integer maxResults) {
        return bookClient.searchBooks(query, maxResults);
    }
}

package io.github.generallyspecific.learningtracker.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Book save(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}

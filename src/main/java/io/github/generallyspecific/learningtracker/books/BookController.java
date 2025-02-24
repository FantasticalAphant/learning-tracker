package io.github.generallyspecific.learningtracker.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Search for books using Google Books API based on keyword
    @PostMapping("/books/search")
    public BookResponse searchBooks(@RequestParam String query, @RequestParam Integer maxResults) {
        return bookService.search(query, maxResults);
    }

    // Add new book to the library
    @PostMapping("/books")
    public Book saveBook(@RequestBody Book book) {
        return bookService.save(book);
    }

    // Get all books in the library
    @GetMapping("/books")
    public List<Book> getBooks() {
        return bookService.findAll();
    }

    // Get all books in the library with the actual topic names (instead of UUID)
    @GetMapping("/books/names")
    public List<BookWithTopicNames> getBooksWithTopics() {
        return bookService.getBooksWithTopicNames();
    }

    // Delete a book from the library based on its ID
    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
    }

    // Get all books based on a topic ID
    @GetMapping("/books/topic/{topicId}")
    public List<Book> getBooksByTopic(@PathVariable UUID topicId) {
        return bookService.getBooksByTopic(topicId);
    }

    // Get all topics for a book based on the book ID
    @GetMapping("/book/topics")
    public List<UUID> getTopicsForBook(@RequestParam String id) {
        return bookService.getTopicsForBook(id);
    }

    // Update topics for a book based on the book ID
    @PutMapping("/book/topics")
    public void addTopicsToBook(@RequestParam String bookId, @RequestBody List<UUID> topicIds) {
        bookService.addTopicsToBook(bookId, topicIds);
    }
}

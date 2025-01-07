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

    @PostMapping("/books/search")
    public BookResponse searchBooks(@RequestParam String query, @RequestParam Integer maxResults) {
        return bookService.search(query, maxResults);
    }

    @PostMapping("/books")
    public Book saveBook(@RequestBody Book book) {
        return bookService.save(book);
    }

    @GetMapping("/books")
    public List<Book> getBooks() {
        return bookService.findAll();
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
    }

    @GetMapping("/books/topic/{topicId}")
    public List<Book> getBooksByTopic(@PathVariable UUID topicId) {
        return bookService.getBooksByTopic(topicId);
    }

    @GetMapping("/book/topics")
    public List<UUID> getTopicsForBook(@RequestParam String id) {
        return bookService.getTopicsForBook(id);
    }

    @PutMapping("/book/topics")
    public void addTopicsToBook(@RequestParam String bookId, @RequestBody List<UUID> topicIds) {
        bookService.addTopicsToBook(bookId, topicIds);
    }
}

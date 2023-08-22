package io.github.generallyspecific.learningtracker.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
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

}

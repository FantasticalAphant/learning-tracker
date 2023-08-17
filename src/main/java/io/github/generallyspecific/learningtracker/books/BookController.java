package io.github.generallyspecific.learningtracker.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/books")
    public BookResponse searchBooks(@RequestParam String query, @RequestParam Integer maxResults) {
        return bookService.search(query, maxResults);
    }
}

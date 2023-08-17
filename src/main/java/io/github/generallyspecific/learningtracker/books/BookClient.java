package io.github.generallyspecific.learningtracker.books;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="book-service", url="https://www.googleapis.com/books/v1/")
public interface BookClient {
    @GetMapping("/volumes")
    BookResponse searchBooks(@RequestParam("q") String title, @RequestParam("maxResults") Integer maxResults);
}

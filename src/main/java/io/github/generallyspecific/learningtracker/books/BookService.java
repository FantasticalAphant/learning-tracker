package io.github.generallyspecific.learningtracker.books;

import io.github.generallyspecific.learningtracker.topic.Topic;
import io.github.generallyspecific.learningtracker.topic.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookClient bookClient;
    private final TopicRepository topicRepository;

    @Autowired
    public BookService(BookRepository bookRepository, BookClient bookClient, TopicRepository topicRepository) {
        this.bookRepository = bookRepository;
        this.bookClient = bookClient;
        this.topicRepository = topicRepository;
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

    public List<Book> getBooksByTopic(UUID topicId) {
        return bookRepository.findAllByTopic(topicId);
    }

    public void addTopicsToBook(String bookId, List<UUID> topicIds) {
        bookRepository.findById(bookId).ifPresent(book -> {
            book.setTopics(topicIds);
            bookRepository.save(book);
        });
    }

    public List<UUID> getTopicsForBook(String id) {
        return bookRepository.findById(id).map(Book::getTopics).orElse(new ArrayList<>());
    }

    public List<BookWithTopicNames> getBooksWithTopicNames() {
        List<Book> books = bookRepository.findAll();
        List<Topic> allTopics = topicRepository.findAll();

        // map of topic UUID -> topic name
        Map<UUID, String> topicNameMap = allTopics.stream().collect(Collectors.toMap(Topic::getId, Topic::getName));

        return books.stream()
                .map(book -> {
                    List<String> topicNames = book.getTopics() == null ?
                            new ArrayList<>() : // handle case where topics is empty (null)
                            book.getTopics()
                                    .stream()
                                    .map(topicNameMap::get)
                                    .collect(Collectors.toList());
                    return BookWithTopicNames.fromBook(book, topicNames);
                })
                .collect(Collectors.toList());
    }
}

package io.github.generallyspecific.learningtracker.articles;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ArticleRepository extends MongoRepository<Article, String> {
    // Get all articles by topic
    @Query(value = "{ 'topics' : ?0 }")
    List<Article> findAllByTopic(UUID topicId);
}

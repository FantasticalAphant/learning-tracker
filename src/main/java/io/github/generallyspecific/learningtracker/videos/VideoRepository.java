package io.github.generallyspecific.learningtracker.videos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.UUID;

public interface VideoRepository extends MongoRepository<Video, String> {
    // Get all videos by topic
    @Query(value = "{ 'topics' : ?0 }")
    List<Video> findAllByTopic(UUID topicId);
}

package io.github.generallyspecific.learningtracker.topic;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface TopicRepository extends MongoRepository<Topic, UUID> {
    List<Topic> findBy(Pageable pageable);
}

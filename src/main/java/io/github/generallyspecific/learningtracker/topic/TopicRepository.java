package io.github.generallyspecific.learningtracker.topic;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TopicRepository extends MongoRepository<Topic, UUID> {
}

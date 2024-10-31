package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface TaskRepository extends MongoRepository<Task, UUID> {
}

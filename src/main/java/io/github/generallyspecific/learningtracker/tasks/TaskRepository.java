package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends MongoRepository<Task, UUID> {
    List<Task> findTopNBy(Pageable pageable);
}

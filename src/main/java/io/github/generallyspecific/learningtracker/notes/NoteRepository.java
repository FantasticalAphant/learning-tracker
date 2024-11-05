package io.github.generallyspecific.learningtracker.notes;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface NoteRepository extends MongoRepository<Note, UUID> {
}

package io.github.generallyspecific.learningtracker.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotes() {
        return noteRepository.findAll();
    }

    public Note createNote(Note note) {
        note.setId(UUID.randomUUID());
        note.setCreatedAt(Instant.now());
        note.setUpdatedAt(Instant.now());
        return noteRepository.save(note);
    }

    public void deleteNote(UUID id) {
        noteRepository.deleteById(id);
    }

    public Note getNote(UUID noteId) {
        return noteRepository.findById(noteId).orElse(null);
    }

    public Note updateNote(UUID noteId, String content) {
        Note note = getNote(noteId);
        note.setContent(content);
        note.setUpdatedAt(Instant.now());
        return noteRepository.save(note);
    }
}

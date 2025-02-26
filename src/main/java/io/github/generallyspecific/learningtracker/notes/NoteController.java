package io.github.generallyspecific.learningtracker.notes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class NoteController {
    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public List<Note> getNotes() {
        return noteService.getNotes();
    }

    @GetMapping("/notes/{noteId}")
    public Note getNote(@PathVariable UUID noteId) {
        return noteService.getNote(noteId);
    }

    @PutMapping("/notes/{noteId}")
    public Note updateNote(@PathVariable UUID noteId, @RequestBody Map<String, String> payload) {
        String content = payload.get("content"); // extract value from the JSON pair
        return noteService.updateNote(noteId, content);
    }

    @PostMapping("/notes")
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID noteId) {
        noteService.deleteNote(noteId);
        return ResponseEntity.ok().build();
    }
}

package io.github.generallyspecific.learningtracker.notes;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class NoteController {
}

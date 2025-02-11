package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${cors.allowed.origins}")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks(@RequestParam(required = false, defaultValue = "0") int limit) {
        if (limit > 0) {
            return taskService.getTasksWithLimit(limit);
        }
        return taskService.getTasks();
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PatchMapping("/tasks/{id}")
    public ResponseEntity<Void> updateTask(@PathVariable("id") UUID id, @RequestBody Map<String, Boolean> fields) {
        taskService.updateTask(id, fields.get("completed"));
        return ResponseEntity.ok().build();
    }
}

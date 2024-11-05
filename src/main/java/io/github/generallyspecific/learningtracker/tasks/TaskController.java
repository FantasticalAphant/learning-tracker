package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }
}

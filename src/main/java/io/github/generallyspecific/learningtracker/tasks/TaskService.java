package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Task addTask(Task task) {
        task.setId(UUID.randomUUID());
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    public List<Task> getTasksWithLimit(int limit) {
        PageRequest pageRequest = PageRequest.of(0, limit, Sort.by("createdAt").descending());
        return taskRepository.findTopNBy(pageRequest);
    }
}

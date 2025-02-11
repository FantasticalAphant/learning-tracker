package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public void updateTask(UUID id, boolean completed) {
        Optional<Task> task = taskRepository.findById(id);
        System.out.println(task.isPresent());
        if (task.isPresent()) {
            task.get().setCompleted(completed);
            taskRepository.save(task.get());
        }
    }

    public void deleteTask(UUID id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
        }
    }

}

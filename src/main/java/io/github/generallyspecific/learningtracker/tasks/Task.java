package io.github.generallyspecific.learningtracker.tasks;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Document(collection = "tasks")
public class Task {
    @Id
    private UUID id;
    private String content;
    private boolean completed;
    private Instant createdAt;
    private Instant completedAt;

    public Task() {
    }

    public Task(UUID id, String content, boolean completed, Instant createdAt, Instant completedAt) {
        this.id = id;
        this.content = content;
        this.completed = completed;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", completed=" + completed +
                ", createdAt=" + createdAt +
                ", completedAt=" + completedAt +
                '}';
    }
}

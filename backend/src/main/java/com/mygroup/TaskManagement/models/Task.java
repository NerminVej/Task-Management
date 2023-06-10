package com.mygroup.TaskManagement.models;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime time;

    @Column
    private List<String> attachments;

    // Represents the relationship between the "Task" entity and the "User" associated with it.
    // ManyToOne signals that many users can have a relationship to the Task entities.
    // The fetch strategy used.
    @ManyToOne(fetch = FetchType.LAZY)
    // Here we specify how we join the two tables together.
    @JoinColumn(name = "user_id")
    private User user;

    public Task(Long id, String name, String status, LocalDateTime time, List<String> attachments, User user) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.time = time;
        this.attachments = attachments;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public List<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<String> attachments) {
        this.attachments = attachments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

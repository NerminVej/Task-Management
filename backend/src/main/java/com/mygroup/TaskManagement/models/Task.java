package com.mygroup.TaskManagement.models;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column
    private String title;
    @Column
    private String status;

    @Column
    private time;

    @Column
    private String comments;
    @Column
    private String attachments;
    @Column
    private Long userId;
}

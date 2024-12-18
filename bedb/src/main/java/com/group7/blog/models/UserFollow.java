package com.group7.blog.models;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames = {"userSourceId", "userTargetId"})
})
public class UserFollow {
    @Id
    @GeneratedValue
    Integer id;

    @Column(name="user_target_id", nullable=false)
    UUID userSourceId;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name = "user_id")
    Users userTargetId;

    public UUID getUserTargetId() {
        return userTargetId.getId();
    }
}



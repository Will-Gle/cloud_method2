package com.group7.blog.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Blog {
    @Id
    @GeneratedValue
    UUID id;
    String title;

    @Column(columnDefinition = "TEXT")
    String content;

    @Column(columnDefinition = "TEXT")
    String summary;

    String thumbnail;
    boolean status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    Timestamp createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @UpdateTimestamp
    Timestamp updatedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Timestamp publishedAt;

    @OneToMany(mappedBy = "blog")
    List<BlogTag> blogTags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    Category category;

    @OneToMany(mappedBy = "blog")
    List<BookMark> bookMarks;

    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY)
    Set<Comment> comments;
    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY)
    List<UserBlogVote> userBlogVotes;
}

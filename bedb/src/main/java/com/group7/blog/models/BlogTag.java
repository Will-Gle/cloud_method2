package com.group7.blog.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class BlogTag {
    @Id
    @GeneratedValue
    Integer id;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    @JsonIgnore
    Blog blog;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    @JsonIgnore
    Tag tag;
}

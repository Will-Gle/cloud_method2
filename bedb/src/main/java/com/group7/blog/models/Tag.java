package com.group7.blog.models;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;


@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Tag {
    @Id
    @GeneratedValue
    UUID id;
    String name;
    String description;

    @OneToMany(mappedBy = "tag")
    List<BlogTag> blogTags;
}

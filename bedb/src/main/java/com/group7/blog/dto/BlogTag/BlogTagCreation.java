package com.group7.blog.dto.BlogTag;

import com.group7.blog.models.Blog;
import com.group7.blog.models.Tag;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogTagCreation {
    Tag tag;
    Blog blog;
}
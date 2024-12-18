package com.group7.blog.dto.Blog.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogUpdateRequest {
    String title;
    String content;
    String thumbnail;
    List<String> tags;
    String categoryName;
}

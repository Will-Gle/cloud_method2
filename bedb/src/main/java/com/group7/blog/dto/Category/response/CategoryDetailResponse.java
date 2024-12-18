package com.group7.blog.dto.Category.response;

import com.group7.blog.dto.Blog.response.BlogDetailResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryDetailResponse {
    UUID id;
    String title;
    String content;
    List<BlogDetailResponse> blogs;
}

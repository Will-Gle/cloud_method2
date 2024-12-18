package com.group7.blog.dto.BookMark.response;

import com.group7.blog.dto.Blog.response.BlogDetailResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookMarkListResponse {
    List<BlogDetailResponse> blogs;
}

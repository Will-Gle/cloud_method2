package com.group7.blog.dto.User.reponse;


import com.group7.blog.dto.Blog.response.BlogDetailResponse;
import com.group7.blog.dto.Blog.response.UserWithBlogDetail;
import com.group7.blog.models.Blog;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    UUID id;
    String firstname;
    String lastname;
    String username;
    List<BlogDetailResponse> blogs;
}

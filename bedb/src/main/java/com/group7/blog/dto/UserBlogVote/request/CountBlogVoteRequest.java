package com.group7.blog.dto.UserBlogVote.request;

import com.group7.blog.models.Blog;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CountBlogVoteRequest {
    @NotEmpty(message = "Blog must be not empty")
    Blog blog;

}

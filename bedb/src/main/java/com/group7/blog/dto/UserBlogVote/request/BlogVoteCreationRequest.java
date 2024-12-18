package com.group7.blog.dto.UserBlogVote.request;

import com.group7.blog.enums.EnumData.VoteType;
import com.group7.blog.models.Blog;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogVoteCreationRequest {
    @NotEmpty(message = "Blog must be not empty")
    Blog blog;

    @NotEmpty(message = "Vote type must be not empty")
    VoteType voteType;
}

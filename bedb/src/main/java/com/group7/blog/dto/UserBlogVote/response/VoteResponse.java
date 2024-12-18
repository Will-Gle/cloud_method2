package com.group7.blog.dto.UserBlogVote.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoteResponse {
    Long upVote = 0L;
    Long downVote = 0L;
}

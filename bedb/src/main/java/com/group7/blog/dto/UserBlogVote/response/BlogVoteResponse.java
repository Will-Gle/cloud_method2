package com.group7.blog.dto.UserBlogVote.response;

import com.group7.blog.enums.EnumData.VoteType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogVoteResponse {
    UUID blogId;
    UUID userId;
    VoteType voteType;
}

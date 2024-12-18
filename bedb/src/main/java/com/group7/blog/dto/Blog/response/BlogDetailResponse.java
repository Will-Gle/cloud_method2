package com.group7.blog.dto.Blog.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group7.blog.dto.Category.response.CategoryResponse;
import com.group7.blog.dto.Tag.response.TagResponseBlogDetail;
import com.group7.blog.dto.User.reponse.UserBlogResponse;
import com.group7.blog.dto.UserBlogVote.response.VoteResponse;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDetailResponse {
    UUID id;
    String title;
    String content;
    String summary;
    String thumbnail;
    boolean status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Timestamp publishedAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Timestamp createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    Timestamp updatedAt;
    List<TagResponseBlogDetail> tags;
    UserBlogResponse user;
    CategoryResponse category;
    VoteResponse votes;

    public BlogDetailResponse(
            UUID id,
            String title,
            String content,
            String summary,
            String thumbnail,
            boolean status,
            Timestamp publishedAt,
            Timestamp createdAt,
            Timestamp updatedAt,
            UserBlogResponse userWithBlogResponse,
            List<TagResponseBlogDetail> tags,
            CategoryResponse category,
            VoteResponse votes
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.thumbnail = thumbnail;
        this.status = status;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = userWithBlogResponse;
        this.tags = tags;
        this.category = category;
        this.votes = votes;
    }

}

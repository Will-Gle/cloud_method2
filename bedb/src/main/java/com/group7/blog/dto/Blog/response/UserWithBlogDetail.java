package com.group7.blog.dto.Blog.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.group7.blog.dto.Tag.response.TagResponseBlogDetail;
import com.group7.blog.dto.User.reponse.UserBlogResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserWithBlogDetail {
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
}

package com.group7.blog.repositories;

import com.group7.blog.dto.Blog.response.BlogResponse;
import com.group7.blog.dto.Tag.response.TagResponse;
import com.group7.blog.dto.Tag.response.TagResponseBlogDetail;
import com.group7.blog.models.Blog;
import com.group7.blog.models.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface BlogTagRepository extends JpaRepository<BlogTag, Integer> {
    @Query("""
          SELECT new com.group7.blog.dto.Blog.response.BlogResponse(
            b.id,
            b.title,
            b.content,
            b.summary,
            b.thumbnail,
            b.status,
            b.publishedAt,
            b.createdAt,
            b.updatedAt)
          from BlogTag bt inner join Blog b on bt.blog.id = b.id
          where bt.tag.id = :tagId
          """)
    List<BlogResponse> findAllBlogsByTagId (@Param("tagId") UUID tagId);

    @Query("""
          SELECT new com.group7.blog.dto.Tag.response.TagResponseBlogDetail(
            t.id,
            t.name)
          from BlogTag bt inner join Tag t on bt.tag.id = t.id
          where bt.blog.id = :blogId
          """)
    List<TagResponseBlogDetail> findAllTagsByBlogId (@Param("blogId") UUID blogId);


    List<BlogTag> findAllByBlogId(UUID blogId);
}

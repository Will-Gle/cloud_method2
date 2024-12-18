package com.group7.blog.mappers;


import com.group7.blog.dto.BlogTag.BlogTagCreation;
import com.group7.blog.models.Blog;
import com.group7.blog.models.BlogTag;
import com.group7.blog.models.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface BlogTagMapper {
    BlogTag toBlogTag(BlogTagCreation blogTag);
}

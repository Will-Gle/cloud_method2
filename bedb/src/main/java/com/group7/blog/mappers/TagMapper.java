package com.group7.blog.mappers;

import com.group7.blog.dto.Tag.request.TagCreateRequest;
import com.group7.blog.dto.Tag.request.TagUpdateRequest;
import com.group7.blog.dto.Tag.response.TagResponse;
import com.group7.blog.dto.Tag.response.TagResponseBlogDetail;
import com.group7.blog.models.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag toTag(TagCreateRequest request);

    void updateTag(@MappingTarget Tag tag, TagUpdateRequest request);

    TagResponse toTagResponse(Tag tag);
    TagResponseBlogDetail toTagResponseBlogDetail(Tag tag);

}




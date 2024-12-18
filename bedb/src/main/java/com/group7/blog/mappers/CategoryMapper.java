package com.group7.blog.mappers;

import com.group7.blog.dto.Category.request.CategoryCreateRequest;
import com.group7.blog.dto.Category.response.CategoryDetailResponse;
import com.group7.blog.dto.Category.response.CategoryResponse;
import com.group7.blog.models.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    Category toCategory(CategoryCreateRequest request);

    CategoryDetailResponse toCategoryDetailResponse(Category category);

    CategoryResponse toCategoryResponse(Category category);
}

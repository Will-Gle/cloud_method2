package com.group7.blog.services;

import com.group7.blog.dto.Category.request.CategoryCreateRequest;
import com.group7.blog.dto.Category.response.CategoryDetailResponse;
import com.group7.blog.enums.ErrorCode;
import com.group7.blog.exceptions.AppException;
import com.group7.blog.mappers.BlogMapper;
import com.group7.blog.mappers.CategoryMapper;
import com.group7.blog.models.Category;
import com.group7.blog.repositories.BlogRepository;
import com.group7.blog.repositories.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;
    BlogRepository blogRepository;
    BlogMapper blogMapper;

    public Category createCategory(CategoryCreateRequest request) {
        return categoryRepository.save(
                categoryMapper.toCategory(request)
        );
    }

    public List<CategoryDetailResponse> getCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryDetailResponse)
                .collect(Collectors.toList());
    }

    public CategoryDetailResponse getCategory(UUID categoryId) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        CategoryDetailResponse categoryDetailResponse = categoryMapper.toCategoryDetailResponse(category);
        categoryDetailResponse.setBlogs(
                category.getBlogs()
                        .stream().map(blogMapper::toBlogDetailResponse)
                        .collect(Collectors.toList())
        );

        return categoryDetailResponse;
    }
}

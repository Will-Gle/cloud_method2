package com.group7.blog.controllers;

import com.group7.blog.dto.Category.request.CategoryCreateRequest;
import com.group7.blog.dto.Category.response.CategoryDetailResponse;
import com.group7.blog.dto.User.reponse.ApiResponse;
import com.group7.blog.models.Category;
import com.group7.blog.services.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @PostMapping
    ApiResponse<Category> createCategory(@RequestBody CategoryCreateRequest request) {
        return ApiResponse.<Category>builder()
                .result(categoryService.createCategory(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CategoryDetailResponse>> getTags() {
        return ApiResponse.<List<CategoryDetailResponse>>builder()
                .result(categoryService.getCategories())
                .build();
    }

    @GetMapping("/{categoryId}")
    ApiResponse<CategoryDetailResponse> getTag(@PathVariable("categoryId") UUID categoryId) {
        return ApiResponse.<CategoryDetailResponse>builder()
                .result(categoryService.getCategory(categoryId))
                .build();
    }
}

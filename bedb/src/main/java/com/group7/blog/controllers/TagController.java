package com.group7.blog.controllers;

import com.group7.blog.dto.Blog.request.BlogFilter;
import com.group7.blog.dto.Tag.response.TagResponse;
import com.group7.blog.dto.User.reponse.ApiResponse;
import com.group7.blog.dto.Tag.request.TagUpdateRequest;
import com.group7.blog.dto.Tag.request.TagCreateRequest;
import com.group7.blog.services.TagService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TagController {
    TagService tagService;
    
    @PostMapping
    ApiResponse<TagResponse> createTag(@RequestBody TagCreateRequest request) {
        return ApiResponse.<TagResponse>builder()
                .result(tagService.createTag(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<TagResponse>> getTags() {
        return ApiResponse.<List<TagResponse>>builder()
                .result(tagService.getTags())
                .build();
    }

    @GetMapping("/{tagId}")
    ApiResponse<TagResponse> getTag(@PathVariable("tagId") UUID tagId) {
        return ApiResponse.<TagResponse>builder()
                .result(tagService.getTag(tagId))
                .build();
    }

    @PutMapping("/{tagId}")
    ApiResponse<TagResponse> updateTag(@PathVariable("tagId") UUID tagId, @RequestBody TagUpdateRequest request) {
        return ApiResponse.<TagResponse>builder()
                .result(tagService.updateTag(tagId, request))
                .build();
    }

    @GetMapping("/blogs/{tagId}")
    ApiResponse<TagResponse> getBlogsByTagId(@PathVariable("tagId") UUID tagId) {
        return ApiResponse.<TagResponse>builder()
                .result(tagService.getBlogsByTagId(tagId))
                .build();
    }
}

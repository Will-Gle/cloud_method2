package com.group7.blog.controllers;


import com.group7.blog.dto.Blog.response.BlogResponse;
import com.group7.blog.dto.BookMark.response.BookMarkListResponse;
import com.group7.blog.dto.BookMark.response.BookMarkResponse;
import com.group7.blog.dto.Tag.response.TagResponse;
import com.group7.blog.dto.User.reponse.ApiResponse;
import com.group7.blog.dto.User.reponse.UserProfileResponse;
import com.group7.blog.dto.User.reponse.UserResponse;
import com.group7.blog.dto.User.request.UserCreationRequest;
import com.group7.blog.dto.User.request.UserFollowRequest;
import com.group7.blog.dto.User.request.UserUpdateRequest;
import com.group7.blog.dto.UserBlogVote.request.BlogVoteCreationRequest;
import com.group7.blog.dto.UserBlogVote.response.BlogVoteResponse;
import com.group7.blog.models.Blog;
import com.group7.blog.models.UserFollow;
import com.group7.blog.models.Users;
import com.group7.blog.services.BookMarkService;
import com.group7.blog.services.UserBlogVoteService;
import com.group7.blog.services.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
@RequestMapping("/users")
public class UserController {
    UserService userService;
    BookMarkService bookMarkService;
    UserBlogVoteService userBlogVoteService;

    @GetMapping
    List<Users> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    ApiResponse<Users> createUser(@RequestBody UserCreationRequest request){
        ApiResponse<Users> usersApiResponse = new ApiResponse<>();
        Users createdUser = userService.createUser(request);
        usersApiResponse.setResult(createdUser);

        return usersApiResponse;
    }

    @GetMapping("/{userId}")
    ApiResponse<Users> getUser(@PathVariable("userId") UUID userId){
        ApiResponse<Users> usersApiResponse = new ApiResponse<>();
        Users user = userService.getUser(userId);
        usersApiResponse.setResult(user);

        return usersApiResponse;

    }

    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable("userId") UUID userId, @RequestBody UserUpdateRequest request){
        ApiResponse<UserResponse> usersApiResponse = new ApiResponse<>();
        UserResponse user = userService.updateUser(userId, request);

        usersApiResponse.setResult(user);
        return usersApiResponse;
    }

    @GetMapping("/me")
    ApiResponse<UserProfileResponse> getMe () {
        return ApiResponse.<UserProfileResponse>builder()
                .message("Get User Profile Successfully!")
                .result(userService.getCurrentUserInfo())
                .build();
    }

    @GetMapping("/{userId}/blogs")
    ApiResponse<UserResponse> getBlogsByUserId(@PathVariable("userId") UUID userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getBlogsByUserId(userId))
                .build();
    }

    @PostMapping("/followers/user")
    ApiResponse<String> followUser(@RequestBody UserFollowRequest request) {
        return ApiResponse.<String>builder()
                .result(userService.followUser(request.getTargetUserId()))
                .build();
    }

    @DeleteMapping("/followers/user")
    ApiResponse<String> unFollowUser(@RequestBody UserFollowRequest request) {
        return ApiResponse.<String>builder()
                .result(userService.unFollowUser(request.getTargetUserId()))
                .build();
    }

    @GetMapping("/followers/user/{userId}/is-following")
    ApiResponse<Boolean> isFollowing(@PathVariable("userId") UUID userId) {
        return ApiResponse.<Boolean>builder()
                .result(userService.isFollowing(userId))
                .build();
    }

    @PutMapping("/bookmarks/blog/{blogId}")
    ApiResponse<BookMarkResponse> addBookMark(@PathVariable("blogId") UUID blogId) {
        return ApiResponse.<BookMarkResponse>builder()
                .result(bookMarkService.addBookMark(blogId))
                .build();
    }

    @DeleteMapping("/bookmarks/blog/{blogId}")
    ApiResponse<String> removeBookMark(@PathVariable("blogId") UUID blogId) {
        return ApiResponse.<String>builder()
                .result(bookMarkService.removeBookMark(blogId))
                .build();
    }

    @GetMapping("/bookmarks")
    ApiResponse<BookMarkListResponse> getBookMarkBlogs () {
        return  ApiResponse.<BookMarkListResponse>builder()
                .result(bookMarkService.getBookMarkBlogs())
                .build();
    }

    @GetMapping("/bookmarks/blog/{blogId}/is-bookmarked")
    ApiResponse<Boolean> isBookMarked(@PathVariable("blogId") UUID blogId) {
        return ApiResponse.<Boolean>builder()
                .result(bookMarkService.isBookMarked(blogId))
                .build();
    }
}

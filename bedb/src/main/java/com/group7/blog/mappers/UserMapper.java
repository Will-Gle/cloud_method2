package com.group7.blog.mappers;

import com.group7.blog.dto.Blog.response.BlogDetailResponse;
import com.group7.blog.dto.User.reponse.UserBlogResponse;
import com.group7.blog.dto.User.reponse.UserProfileResponse;
import com.group7.blog.dto.User.reponse.UserResponse;
import com.group7.blog.dto.User.request.UserCreationRequest;
import com.group7.blog.dto.User.request.UserUpdateRequest;
import com.group7.blog.models.Blog;
import com.group7.blog.models.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);


    @Mapping(target = "firstname", source = "firstname")
    @Mapping(target = "lastname", source = "lastname")
    @Mapping(target = "username", source = "username")
    Users toUser(UserCreationRequest request);


    void updateUser(@MappingTarget Users user, UserUpdateRequest request);

    UserBlogResponse toUserWithBlogResponse(Users user);

    @Mapping(source = "blogs", target = "blogs")
    UserResponse toUserResponse(Users user);

    UserProfileResponse toUserProfileResponse(Users user);
}

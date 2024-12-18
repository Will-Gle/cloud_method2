package com.group7.blog.mappers;


import com.group7.blog.dto.UserBlogVote.request.BlogVoteCreationRequest;
import com.group7.blog.dto.UserBlogVote.response.BlogVoteResponse;
import com.group7.blog.models.UserBlogVote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserBlogVoteMapper {
    UserBlogVoteMapper INSTANCE = Mappers.getMapper(UserBlogVoteMapper.class);

    // Map BlogVoteCreationRequest to UserBlogVote
    @Mapping(target = "blog", source = "blog")
    @Mapping(target = "voteType", source = "voteType")
    UserBlogVote toUserBlogVote(BlogVoteCreationRequest request);

    // Map UserBlogVote to BlogVoteResponse and map blogId and userId correctly
    @Mapping(target = "blogId", source = "userBlogVote.blog.id")
    @Mapping(target = "userId", source = "userBlogVote.users.id")
    BlogVoteResponse toResponse(UserBlogVote userBlogVote);

    // Update existing UserBlogVote with new voteType
    @Mapping(target = "voteType", source = "voteType")
    void updateBlogVote(@MappingTarget UserBlogVote existingVote, BlogVoteCreationRequest request);
}

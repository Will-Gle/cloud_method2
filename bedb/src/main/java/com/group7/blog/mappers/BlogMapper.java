package com.group7.blog.mappers;

import com.group7.blog.dto.Blog.request.BlogCreationRequest;
import com.group7.blog.dto.Blog.request.BlogUpdateRequest;
import com.group7.blog.dto.Blog.response.BlogDetailResponse;
import com.group7.blog.dto.Blog.response.BlogResponse;
import com.group7.blog.dto.Blog.response.UserWithBlogDetail;
import com.group7.blog.dto.Tag.response.TagResponseBlogDetail;
import com.group7.blog.dto.UserBlogVote.response.VoteResponse;
import com.group7.blog.enums.EnumData;
import com.group7.blog.models.Blog;
import com.group7.blog.models.BlogTag;
import com.group7.blog.models.UserBlogVote;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BlogMapper {
    BlogMapper INSTANCE = Mappers.getMapper(BlogMapper.class);

    Blog toBlog(BlogCreationRequest request);

    @Mapping(target = "title", source = "title")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "thumbnail", source = "thumbnail")
    void updateBlog(@MappingTarget Blog blog, BlogUpdateRequest request);

    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    BlogResponse toBlogResponse(Blog blog);


    @Mapping(source = "users", target = "user")
    @Mapping(source = "category", target = "category")
    @Mapping(source = "blogTags", target = "tags", qualifiedByName = "mapTags")
    @Mapping(source = " userBlogVotes", target = "votes", qualifiedByName = "mapVotes")
    BlogDetailResponse toBlogDetailResponse(Blog blog);

    @Mapping(source = "blogTags", target = "tags", qualifiedByName = "mapTags")
    UserWithBlogDetail toUserWithBlogDetail(Blog blog);

    // Custom method to map BlogTags to TagResponseBlogDetail
    @Named("mapTags")
    public default List<TagResponseBlogDetail> mapTags(List<BlogTag> blogTags) {
        return Optional.ofNullable(blogTags)
                .orElse(Collections.emptyList())
                .stream()
                .map(blogTag -> new TagResponseBlogDetail(
                        blogTag.getTag().getId(),
                        blogTag.getTag().getName()
                ))
                .collect(Collectors.toList());
    }

    @Named("mapVotes")
    public default VoteResponse mapVotes(List<UserBlogVote> userBlogVotes) {
        VoteResponse voteResponse = new VoteResponse();
        userBlogVotes.forEach(vote -> {
            if(vote.getVoteType().equals(EnumData.VoteType.UPVOTE))
                voteResponse.setUpVote(voteResponse.getUpVote() + 1);
            else
                voteResponse.setDownVote(voteResponse.getDownVote() + 1);
        });
        return voteResponse;
    }
}




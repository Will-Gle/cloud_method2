package com.group7.blog.services;

import com.group7.blog.dto.User.reponse.UserProfileResponse;
import com.group7.blog.dto.User.reponse.UserResponse;
import com.group7.blog.dto.UserBlogVote.request.BlogVoteCreationRequest;
import com.group7.blog.dto.UserBlogVote.request.CountBlogVoteRequest;
import com.group7.blog.dto.UserBlogVote.response.BlogVoteResponse;
import com.group7.blog.enums.EnumData.VoteType;
import com.group7.blog.enums.ErrorCode;
import com.group7.blog.exceptions.AppException;
import com.group7.blog.mappers.UserBlogVoteMapper;
import com.group7.blog.mappers.UserMapper;
import com.group7.blog.models.Blog;
import com.group7.blog.models.UserBlogVote;
import com.group7.blog.models.Users;
import com.group7.blog.repositories.BlogRepository;
import com.group7.blog.repositories.UserBlogVoteRepository;
import com.group7.blog.repositories.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserBlogVoteService {
    UserRepository userRepository;
    BlogRepository blogRepository;
    UserBlogVoteRepository userBlogVoteRepository;
    UserBlogVoteMapper userBlogVoteMapper;
    UserMapper userMapper;

    public BlogVoteResponse create(VoteType voteType, UUID blogId){
        SecurityContext context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();

        Users user = userRepository
                .findById(UUID
                        .fromString(userId))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Blog blog = blogRepository
                .findById(blogId)
                .orElseThrow(() -> new AppException(ErrorCode.BLOG_NOT_EXISTED));

        UserBlogVote existingVoteOpt = userBlogVoteRepository.findByUsersAndBlog(user, blog);
        if (existingVoteOpt != null){
            if(existingVoteOpt.getVoteType().equals(voteType))
                throw new AppException(ErrorCode.VOTE_EXISTED);
            userBlogVoteRepository.delete(existingVoteOpt);
        }
        // Create a new vote
        UserBlogVote newVote = new UserBlogVote();
        newVote.setVoteType(voteType);
        newVote.setBlog(blog);
        newVote.setUsers(user);
        userBlogVoteRepository.save(newVote);
        return userBlogVoteMapper.toResponse(newVote);
    }

    public String delete(UUID blogId){
        SecurityContext context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();

        Users user = userRepository
                .findById(UUID
                        .fromString(userId))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Blog blog = blogRepository
                .findById(blogId)
                .orElseThrow(() -> new AppException(ErrorCode.BLOG_NOT_EXISTED));

        UserBlogVote existingVoteOpt = userBlogVoteRepository.findByUsersAndBlog(user, blog);
        if(existingVoteOpt == null) {
            throw new AppException(ErrorCode.VOTE_NOT_FOUND);
        }
        userBlogVoteRepository.delete(existingVoteOpt);
        return "Remove vote successfully!";
    }

    public List<UserProfileResponse> getUserVotesByBlogId(UUID blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new AppException(ErrorCode.BLOG_NOT_EXISTED));

        return userBlogVoteRepository.findAllByBlogId(blogId).stream().map(
                vote -> userMapper.toUserProfileResponse(vote.getUsers())
        ).toList();
    }
}

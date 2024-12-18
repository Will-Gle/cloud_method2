package com.group7.blog.repositories;

import com.group7.blog.enums.EnumData.VoteType;  // Ensure you import the VoteType enum here
import com.group7.blog.models.Blog;
import com.group7.blog.models.UserBlogVote;
import com.group7.blog.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserBlogVoteRepository extends JpaRepository<UserBlogVote, Integer> {
    UserBlogVote findByUsersAndBlog(Users user, Blog blog);
    Long countByBlog_IdAndVoteType(UUID blogId, VoteType voteType);
    List<UserBlogVote> findAllByBlogId(UUID blogId);
}
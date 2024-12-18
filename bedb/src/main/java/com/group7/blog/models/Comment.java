package com.group7.blog.models;


import jakarta.persistence.*;

import java.util.Set;
import java.util.UUID;

@Entity
public class Comment {
    @Id
    @GeneratedValue
    private UUID id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blogId")
    private Blog blog;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users users;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentId")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY)
    private Set<Comment> comments;
    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY)
    private Set<UserCommentVote> userCommentVotes;

    private String content;




}

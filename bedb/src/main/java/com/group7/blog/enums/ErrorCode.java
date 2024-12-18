package com.group7.blog.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    // GLOBAL ERRORS
    INTERNAL_SERVER_ERROR(9999, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),

    // USER ERRORS
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1003, "User not existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(401, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_TOKEN(401, "Invalid token", HttpStatus.UNAUTHORIZED),

    USER_ID_INVALID(401, "User id invalid", HttpStatus.NOT_FOUND),
    USER_FOLLOW_EXISTED(401, "User follow existed", HttpStatus.FOUND),
    // BLOG ERRORS
    BLOG_NOT_EXISTED(1005, "Blog not existed", HttpStatus.NOT_FOUND),

    // TAG ERRORS
    TAG_NOT_EXISTED(1005, "Tag not existed", HttpStatus.NOT_FOUND),

    //CATEGORY ERRORS
    CATEGORY_NOT_EXISTED(1005, "Category not existed", HttpStatus.NOT_FOUND),
  
    // VOTE ERROR
    VOTETYPE_NOT_EXISTED(1005, "Vote type must be UPVOTE or DOWNVOTE", HttpStatus.NOT_FOUND),
    VOTE_EXISTED(404, "Vote is existed", HttpStatus.BAD_REQUEST),
    VOTE_NOT_FOUND(404, "Vote not found", HttpStatus.NOT_FOUND),
    //BOOKMARK ERRORS
    BOOKMARK_NOT_FOUND(404, "Bookmark not found", HttpStatus.NOT_FOUND),
    BOOKMARK_EXISTED(404, "Bookmark is existed", HttpStatus.BAD_REQUEST),

    ;
    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}

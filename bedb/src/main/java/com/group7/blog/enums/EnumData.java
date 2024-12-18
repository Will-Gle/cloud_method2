package com.group7.blog.enums;

public class EnumData {

    public enum VoteType {
        UPVOTE,
        DOWNVOTE,
        NONE,
        ;

        public static VoteType fromString(String value) {
            try {
                return VoteType.valueOf(value);
            } catch (IllegalArgumentException e) {
                return NONE;  // Default value if invalid
            }
        }
    }


}

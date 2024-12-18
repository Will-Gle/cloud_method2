package com.group7.blog.dto.User.reponse;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserBlogResponse {
    UUID id;
    String firstname;
    String lastname;
    String username;
}

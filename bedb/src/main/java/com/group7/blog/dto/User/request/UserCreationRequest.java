package com.group7.blog.dto.User.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    UUID id;
    String firstname;
    String lastname;
    String username;
    String hashpassword;
    String email;
    String phonenumber;
}

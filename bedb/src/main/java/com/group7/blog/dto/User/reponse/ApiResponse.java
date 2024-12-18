package com.group7.blog.dto.User.reponse;

import com.group7.blog.enums.StatusCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    @Builder.Default
    int code = StatusCode.SUCCESS.getCode();
    @Builder.Default
    String message = StatusCode.SUCCESS.getMessage();
    T result;
}

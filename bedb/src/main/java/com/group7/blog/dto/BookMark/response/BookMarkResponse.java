package com.group7.blog.dto.BookMark.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookMarkResponse {
    UUID blogId;
    UUID userId;
}

package com.group7.blog.dto.BlogTag;

import com.group7.blog.dto.Tag.response.TagResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogTagResponse {
    TagResponse tagResponse;
}

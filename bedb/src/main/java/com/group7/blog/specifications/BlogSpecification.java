package com.group7.blog.specifications;

import com.group7.blog.models.Blog;
import com.group7.blog.models.BlogTag;
import com.group7.blog.models.Tag;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class BlogSpecification {
    private BlogSpecification() {}

    public static Specification<Blog> hasTags(List<UUID> tags) {
        return (root, query, criteriaBuilder) -> {
            Join<Blog, BlogTag> blogTags = root.join("blogTags");
            Join<BlogTag, Tag> tagBlogs = blogTags.join("tag");
            List<Predicate> predicates = new ArrayList<>();
            tags.forEach(tagId -> {
                Predicate predicate = criteriaBuilder.equal(tagBlogs.get("id"), tagId);
                predicates.add(predicate);
            });
            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }
}

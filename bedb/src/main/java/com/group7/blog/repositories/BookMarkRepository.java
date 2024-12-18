package com.group7.blog.repositories;

import com.group7.blog.models.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookMarkRepository extends JpaRepository<BookMark, UUID> {
    @Query("Select b from BookMark b where b.user.id=:userId and b.blog.id=:blogId")
    Optional<BookMark> findByUserBlogIdOptional(@Param("userId") UUID userId, @Param("blogId") UUID blogId);

    @Query("Select b from BookMark b where b.user.id=:userId")
    List<BookMark> findAllByUserId(@Param("userId") UUID userId);

    @Query("Select b from BookMark b where b.user.id=:userId and b.blog.id=:blogId")
    BookMark findByUserBlogId(@Param("userId") UUID userId, @Param("blogId") UUID blogId);
}

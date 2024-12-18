package com.group7.blog.repositories;

import com.group7.blog.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
    boolean existsByUsername(String username);
    Optional<Users> findByUsername(String username);

    @Query("SELECT u FROM Users u LEFT JOIN FETCH u.blogs WHERE u.id = :userId")
    Users findUserWithBlogsById(@Param("userId") UUID userId);


}

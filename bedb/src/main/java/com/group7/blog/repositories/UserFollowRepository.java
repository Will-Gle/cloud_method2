package com.group7.blog.repositories;

import com.group7.blog.models.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserFollowRepository extends JpaRepository<UserFollow, UUID> {
    @Query("Select u from UserFollow u where u.userSourceId=:userSourceId and u.userTargetId.id=:userTargetId")
    Optional<UserFollow> findByUserTargetSourceIdOptional(@Param("userTargetId") UUID userTargetId, @Param("userSourceId") UUID userSourceId);

    @Query("Select u from UserFollow u where u.userSourceId=:userSourceId and u.userTargetId.id=:userTargetId")
    UserFollow findByUserTargetSourceId(@Param("userTargetId") UUID userTargetId, @Param("userSourceId") UUID userSourceId);

}

package com.projectmanagement.backend.repository;

import com.projectmanagement.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    List<User> findByActiveTrueOrderByFullNameAsc();

    List<User> findByIdInAndActiveTrue(Collection<Long> ids);

    @Query("""
            select user
            from User user
            where user.active = true
              and (
                    :search is null
                    or :search = ''
                    or lower(user.fullName) like lower(concat('%', :search, '%'))
                    or lower(user.email) like lower(concat('%', :search, '%'))
                    or lower(user.roleLabel) like lower(concat('%', :search, '%'))
                  )
            order by user.fullName asc
            """)
    List<User> searchAvailableUsers(@Param("search") String search);
}
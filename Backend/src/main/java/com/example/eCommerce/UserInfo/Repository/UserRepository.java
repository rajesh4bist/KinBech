package com.example.eCommerce.UserInfo.Repository;

import com.example.eCommerce.UserInfo.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}

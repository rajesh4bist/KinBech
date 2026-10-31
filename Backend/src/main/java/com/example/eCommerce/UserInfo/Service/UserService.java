package com.example.eCommerce.UserInfo.Service;

import com.example.eCommerce.UserInfo.Repository.UserRepository;
import com.example.eCommerce.UserInfo.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        User userRequest = userRepository.save(user);
        return userRequest;
    }
}

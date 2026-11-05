package com.example.eCommerce.UserInfo.Service;

import com.example.eCommerce.UserInfo.DTO.LoginRequest;
import com.example.eCommerce.UserInfo.DTO.SignupRequest;
import com.example.eCommerce.UserInfo.Repository.UserRepository;
import com.example.eCommerce.UserInfo.User;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(SignupRequest request) {

        if (!Objects.equals(request.getPassword(), request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User userRequest = userRepository.save(user);
        return userRequest;
    }

    public String getUser(LoginRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            User currentUser = userRepository.getUserByEmail(request.getEmail());
            if (Objects.equals(currentUser.getPassword(), request.getPassword())) {
                return currentUser.getName();
            }
            return null;
        } else {
            throw new RuntimeException("User doesn't exist.");
        }
    }

}

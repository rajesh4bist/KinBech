package com.example.eCommerce.UserInfo.Service;

import com.example.eCommerce.UserInfo.DTO.*;
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

    private LoginResponseDto mapToLoginResponseDto(User currentUser) {
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setName(currentUser.getName());
        loginResponseDto.setEmail(currentUser.getEmail());
        return loginResponseDto;
    }

    public LoginResponseDto getUser(LoginRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            User currentUser = userRepository.getUserByEmail(request.getEmail());
            if (Objects.equals(currentUser.getPassword(), request.getPassword())) {
                return mapToLoginResponseDto(currentUser);
            }
            return null;
        } else {
            throw new RuntimeException("User doesn't exist.");
        }
    }

    //To be used when Edit Account is used
    public EditAccountDetailsResponseDto editAccountDetails(EditAccountDetailsRequestDto editAccountDetailsRequestDto) {
        User currentUser = userRepository.getUserByEmail(editAccountDetailsRequestDto.getEmail());
        if (Objects.equals(currentUser.getPassword(), editAccountDetailsRequestDto.getPassword())) {
            currentUser.setName(editAccountDetailsRequestDto.getName());
            currentUser.setEmail(editAccountDetailsRequestDto.getEmail());
            return mapToEditAccountDetailsDto(currentUser);

        }
        return null;
    }

    private EditAccountDetailsResponseDto mapToEditAccountDetailsDto(User currentUser) {
        EditAccountDetailsResponseDto responseDto = new EditAccountDetailsResponseDto();
        responseDto.setName(currentUser.getName());
        responseDto.setEmail(currentUser.getEmail());
        return responseDto;
    }

    //To be used when password is to be changed.
}

package com.example.eCommerce.UserInfo.Controller;

import com.example.eCommerce.UserInfo.DTO.SignupRequest;
import com.example.eCommerce.UserInfo.Service.UserService;
import com.example.eCommerce.UserInfo.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/users")
@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody SignupRequest request) {
        User createdUser = userService.createUser(request);
        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords don't match");
        }
        return ResponseEntity.ok("User Created");
    }
}

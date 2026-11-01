package com.example.eCommerce.UserInfo.Controller;

import com.example.eCommerce.UserInfo.DTO.SignupRequest;
import com.example.eCommerce.UserInfo.Service.UserService;
import com.example.eCommerce.UserInfo.User;
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
        try {
            User createdUser = userService.createUser(request);
            return ResponseEntity.ok("User Created");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<User> getUser() {
        return null;
    }
}

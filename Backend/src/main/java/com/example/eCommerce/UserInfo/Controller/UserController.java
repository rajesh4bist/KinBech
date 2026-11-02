package com.example.eCommerce.UserInfo.Controller;

import com.example.eCommerce.UserInfo.DTO.LoginRequest;
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
        try {
            userService.createUser(request);
            return ResponseEntity.ok("User Created");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> getUser(@RequestBody LoginRequest request) {
        try {
            User thisUser = userService.getUser(request);
            return ResponseEntity.ok(thisUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

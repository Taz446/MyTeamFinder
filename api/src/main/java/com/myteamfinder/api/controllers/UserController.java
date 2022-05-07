package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User postUser(@RequestBody User user) {
        return userService.createNewUser(user);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> putUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/google-id/{googleId}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByGoogleId(@PathVariable String googleId) {
        return userService.findByGoogleId(googleId);
    }

    @GetMapping("/emails/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/password-compare/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Boolean comparePasswords(@PathVariable Long userId,@RequestBody Map<String, String> password) {
        return userService.comparePasswords(userId, password.get("password"));
    }

    @PutMapping("/password-change/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User changePassword(@PathVariable Long id, @RequestBody Map<String, String> password) {
        return this.userService.changePassword(id, password.get("password"));
    }

    @GetMapping("/recommendation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, List<Team>> getRecommendations(@PathVariable Long id) {
        return this.userService.getRecommendation(id);
    }
}

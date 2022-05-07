package com.myteamfinder.api.services;

import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<User> getAllUsers();

    ResponseEntity<User> getUserById(Long id);

    User createNewUser(User user);

    ResponseEntity<User> updateUser(Long id, User user);

    ResponseEntity<Map<String, Boolean>> deleteUser(Long id);

    User findByGoogleId(String googleId);

    User findByEmail(String email);

    Boolean comparePasswords(Long id, String password);

    User changePassword (Long id, String password);

    Map<String, List<Team>> getRecommendation(Long id);
}

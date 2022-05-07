package com.myteamfinder.api.services;

import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface LolUserService {

    List<LolUser> getAllLolUsers();

    ResponseEntity<LolUser> getLolUserById(Long id);

    LolUser createNewLolUser(LolUser lolUser, String region);

    ResponseEntity<LolUser> updateLolUser(Long id, LolUser lolUser);

    ResponseEntity<Map<String, Boolean>> deleteLolUser(Long id);

    ResponseEntity<User> getUser(Long id);

    Optional<List<LolUser>> getByTeam(Long teamId);
}

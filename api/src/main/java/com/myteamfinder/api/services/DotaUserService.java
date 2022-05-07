package com.myteamfinder.api.services;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface DotaUserService {

    List<DotaUser> getAllDotaUsers();

    ResponseEntity<DotaUser> getDotaUserById(Long id);

    DotaUser createNewDotaUser(DotaUser dotaUser);

    ResponseEntity<DotaUser> updateDotaUser(Long id, DotaUser dotaUser);

    ResponseEntity<Map<String, Boolean>> deleteDotaUser(Long id);

    ResponseEntity<User> getUser(Long id);

    Optional<List<DotaUser>> getByTeam(Long teamId);
}

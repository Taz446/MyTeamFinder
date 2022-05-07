package com.myteamfinder.api.services;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface TeamService {

    List<Team> getAllTeams();

    ResponseEntity<Team> getTeamById(Long id);

    Team createNewTeam(Team team, Long id);

    ResponseEntity<Team> updateTeam(Long id, Team team);

    ResponseEntity<Map<String, Boolean>> deleteTeam(Long id);

    ResponseEntity<Set<DotaUser>> getDotaUsers(Long id);

    ResponseEntity<Set<DotaUser>> addDotaUser(Long id, Long lolUserId);

    ResponseEntity<Set<DotaUser>> removeDotaUser(Long id, Long lolUserId);

    ResponseEntity<Set<LolUser>> getLolUsers(Long id);

    ResponseEntity<Set<LolUser>> addLolUser(Long id, Long lolUserId);

    ResponseEntity<Set<LolUser>> removeLolUser(Long id, Long lolUserId);

    ResponseEntity<User> getOwner(Long id);
}

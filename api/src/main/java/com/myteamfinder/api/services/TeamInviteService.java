package com.myteamfinder.api.services;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.TeamInvite;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface TeamInviteService {

    TeamInvite createTeamInvite(TeamInvite teamInvite);

    ResponseEntity<Map<String, Boolean>> deleteTeamInvite(Long id);

    List<TeamInvite> findByLolUserAndType(LolUser lolUser, String type);

    List<TeamInvite> findByDotaUserAndType(DotaUser dotaUser, String type);

    List<TeamInvite> findByTeamAndType(Team team, String type);

    ResponseEntity<Map<String, Boolean>> deleteByLolUser(Long teamInviteId);

    ResponseEntity<Map<String, Boolean>> deleteByDotaUser(Long teamInviteId);

    ResponseEntity<Map<String, Boolean>> deleteByLolUserAndTeam(Long teamInviteId);

    ResponseEntity<Map<String, Boolean>> deleteByDotaUserAndTeam(Long teamInviteId);
}

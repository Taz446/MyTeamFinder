package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.TeamInvite;
import com.myteamfinder.api.services.TeamInviteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/team-invites")
public class TeamInviteController {

    private final TeamInviteService teamInviteService;

    public TeamInviteController(TeamInviteService teamInviteService) {
        this.teamInviteService = teamInviteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeamInvite createTeamInvite(@RequestBody TeamInvite teamInvite) {
        return teamInviteService.createTeamInvite(teamInvite);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteTeamInvite(@PathVariable Long id) {
        return teamInviteService.deleteTeamInvite(id);
    }

    @PostMapping({"/lol-user/{type}"})
    @ResponseStatus(HttpStatus.OK)
    public List<TeamInvite> getByLolUserAndType(@RequestBody LolUser lolUser,@PathVariable String type) {
        return teamInviteService.findByLolUserAndType(lolUser, type);
    }

    @PostMapping({"/dota-user/{type}"})
    @ResponseStatus(HttpStatus.OK)
    public List<TeamInvite> getByDotaUserAndType(@RequestBody DotaUser dotaUser, @PathVariable String type) {
        return teamInviteService.findByDotaUserAndType(dotaUser, type);
    }

    @PostMapping({"/team/{type}"})
    @ResponseStatus(HttpStatus.OK)
    public List<TeamInvite> getByTeamAndType(@RequestBody Team team, @PathVariable String type) {
        return teamInviteService.findByTeamAndType(team, type);
    }

    @DeleteMapping({"/delete-by-lol-user/{teamInviteId}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteByLolUser(@PathVariable Long teamInviteId) {
        return teamInviteService.deleteByLolUser(teamInviteId);
    }

    @DeleteMapping({"/delete-by-dota-user/{teamInviteId}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteByDotaUser(@PathVariable Long teamInviteId) {
        return teamInviteService.deleteByDotaUser(teamInviteId);
    }

    @DeleteMapping({"/delete-by-lol-user-and-team/{teamInviteId}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteByLolUserAndTeam(@PathVariable Long teamInviteId) {
        return teamInviteService.deleteByLolUserAndTeam(teamInviteId);
    }

    @DeleteMapping({"/delete-by-dota-user-and-team/{teamInviteId}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteByDotaUserAndTeam(@PathVariable Long teamInviteId) {
        return teamInviteService.deleteByDotaUserAndTeam(teamInviteId);
    }
}

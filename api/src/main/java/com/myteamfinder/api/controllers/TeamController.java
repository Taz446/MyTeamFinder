package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.services.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Team> getTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Team> getTeam(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    @PostMapping("/create/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Team postTeam(@RequestBody Team team, @PathVariable Long userId) {
        return teamService.createNewTeam(team, userId);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Team> putTeam(@PathVariable Long id, @RequestBody Team team) {
        return teamService.updateTeam(id, team);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteTeam(@PathVariable Long id) {
        return teamService.deleteTeam(id);
    }

    @PutMapping("/{id}/add-dota-user/{dotaUserId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<DotaUser>> addDotaUser(@PathVariable Long id, @PathVariable Long dotaUserId) {
        return teamService.addDotaUser(id, dotaUserId);
    }

    @PutMapping("/{id}/remove-dota-user/{dotaUserId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<DotaUser>> removeDotaUser(@PathVariable Long id, @PathVariable Long dotaUserId) {
        return teamService.removeDotaUser(id, dotaUserId);
    }

    @PutMapping("/{id}/add-lol-user/{lolUserId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<LolUser>> addLolUser(@PathVariable Long id, @PathVariable Long lolUserId) {
        return teamService.addLolUser(id, lolUserId);
    }

    @PutMapping("/{id}/remove-lol-user/{lolUserId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<LolUser>> removeLolUser(@PathVariable Long id, @PathVariable Long lolUserId) {
        return teamService.removeLolUser(id, lolUserId);
    }

    @GetMapping("/{id}/owner")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getOwner(@PathVariable Long id){
        return teamService.getOwner(id);
    }
}

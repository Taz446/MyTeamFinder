package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.services.LolUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/lol-users")
public class LolUserController {

    private final LolUserService lolUserService;

    public LolUserController(LolUserService lolUserService) {
        this.lolUserService = lolUserService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<LolUser> getLolUsers() {
        return lolUserService.getAllLolUsers();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<LolUser> getLolUser(@PathVariable Long id) {
        return lolUserService.getLolUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LolUser postLolUser(@RequestBody LolUser lolUser, @RequestBody String region) {
        return lolUserService.createNewLolUser(lolUser, region);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<LolUser> putLolUser(@PathVariable Long id, @RequestBody LolUser lolUser) {
        return lolUserService.updateLolUser(id, lolUser);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteLolUser(@PathVariable Long id) {
        return lolUserService.deleteLolUser(id);
    }

    @GetMapping({"/{id}/user"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return lolUserService.getUser(id);
    }

    @GetMapping({"/team/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Optional<List<LolUser>> getByTeam(@PathVariable Long id) {
        return lolUserService.getByTeam(id);
    }
}

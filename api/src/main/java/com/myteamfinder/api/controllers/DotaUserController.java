package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.services.DotaUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/dota-users")
public class DotaUserController {

    private final DotaUserService dotaUserService;

    public DotaUserController(DotaUserService dotaUserService) {
        this.dotaUserService = dotaUserService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<DotaUser> getDotaUsers() {
        return dotaUserService.getAllDotaUsers();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<DotaUser> getDotaUser(@PathVariable Long id) {
        return dotaUserService.getDotaUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DotaUser postDotaUser(@RequestBody DotaUser dotaUser) {
        return dotaUserService.createNewDotaUser(dotaUser);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<DotaUser> putDotaUser(@PathVariable Long id, @RequestBody DotaUser dotaUser) {
        return dotaUserService.updateDotaUser(id, dotaUser);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteDotaUser(@PathVariable Long id) {
        return dotaUserService.deleteDotaUser(id);
    }

    @GetMapping({"/{id}/user"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return dotaUserService.getUser(id);
    }

    @GetMapping({"/team/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public Optional<List<DotaUser>> getByTeam(@PathVariable Long id) {
        return dotaUserService.getByTeam(id);
    }
}

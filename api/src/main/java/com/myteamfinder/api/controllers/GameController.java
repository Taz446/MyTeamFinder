package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.Game;
import com.myteamfinder.api.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Game> getGames() {
        return gameService.getAllGames();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        return gameService.getGameById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Game postGame(@RequestBody Game game) {
        return gameService.createNewGame(game);
    }
}

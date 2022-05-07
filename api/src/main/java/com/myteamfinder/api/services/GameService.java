package com.myteamfinder.api.services;

import com.myteamfinder.api.model.Game;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GameService {

    List<Game> getAllGames();

    ResponseEntity<Game> getGameById(Long id);

    Game createNewGame(Game game);
}

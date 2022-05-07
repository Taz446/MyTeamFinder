package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.Game;
import com.myteamfinder.api.repositories.GameRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl implements GameService{

    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Override
    public ResponseEntity<Game> getGameById(Long id){
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id : " + id));
        return ResponseEntity.ok(game);
    }

    @Override
    public Game createNewGame(Game game) {
        return gameRepository.save(game);
    }
}

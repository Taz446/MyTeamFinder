package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.repositories.LolUserRepository;
import com.myteamfinder.api.repositories.TeamRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LolUserServiceImpl implements LolUserService{

    private final LolUserRepository lolUserRepository;
    private final TeamRepository teamRepository;

    public LolUserServiceImpl(LolUserRepository lolUserRepository, TeamRepository teamRepository) {
        this.lolUserRepository = lolUserRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public List<LolUser> getAllLolUsers() {
        return lolUserRepository.findAll();
    }

    @Override
    public ResponseEntity<LolUser> getLolUserById(Long id){
        LolUser lolUser = lolUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return ResponseEntity.ok(lolUser);
    }

    @Override
    public LolUser createNewLolUser(LolUser lolUser, String region){
        lolUser.setLolRegion(region);
        return lolUserRepository.save(lolUser);
    }

    @Override
    public ResponseEntity<LolUser> updateLolUser(Long id, LolUser lolUserDetails){
        LolUser lolUser = lolUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        lolUser.setTeam(lolUserDetails.getTeam());
        lolUser.setLolExp(lolUserDetails.getLolExp());
        lolUser.setSummonerName(lolUserDetails.getSummonerName());
        lolUser.setRank(lolUserDetails.getRank());
        lolUser.setLolRegion(lolUserDetails.getLolRegion());

        LolUser updatedLolUser = lolUserRepository.save(lolUser);
        return ResponseEntity.ok(updatedLolUser);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteLolUser(Long id){
        LolUser lolUser = lolUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        lolUserRepository.delete(lolUser);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<User> getUser(Long id) {
        LolUser lolUser = lolUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return ResponseEntity.ok(lolUser.getUser());
    }

    @Override
    public Optional<List<LolUser>> getByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id : " + teamId));
        return lolUserRepository.findByTeam(team);
    }
}

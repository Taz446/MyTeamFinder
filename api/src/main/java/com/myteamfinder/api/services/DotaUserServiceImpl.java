package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.repositories.DotaUserRepository;
import com.myteamfinder.api.repositories.TeamRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DotaUserServiceImpl implements DotaUserService{

    private final DotaUserRepository dotaUserRepository;
    private final TeamRepository teamRepository;

    public DotaUserServiceImpl(DotaUserRepository dotaUserRepository, TeamRepository teamRepository) {
        this.dotaUserRepository = dotaUserRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public List<DotaUser> getAllDotaUsers() {
        return dotaUserRepository.findAll();
    }

    @Override
    public ResponseEntity<DotaUser> getDotaUserById(Long id){
        DotaUser dotaUser = dotaUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return ResponseEntity.ok(dotaUser);
    }

    @Override
    public DotaUser createNewDotaUser(DotaUser dotaUser){
        return dotaUserRepository.save(dotaUser);
    }

    @Override
    public ResponseEntity<DotaUser> updateDotaUser(Long id, DotaUser dotaUserDetails){
        DotaUser dotaUser = dotaUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        if (dotaUserDetails.getTeam() != null) {
            dotaUser.setTeam(dotaUserDetails.getTeam());
        }
        if (dotaUserDetails.getDotaExp() != null) {
            dotaUser.setDotaExp(dotaUserDetails.getDotaExp());
        }
        if (dotaUserDetails.getDotaName() != null) {
            dotaUser.setDotaName(dotaUserDetails.getDotaName());
        }
        if (dotaUserDetails.getSoloMmr() != null) {
            dotaUser.setSoloMmr(dotaUserDetails.getSoloMmr());
        }
        if (dotaUserDetails.getPartyMmr() != null) {
            dotaUser.setPartyMmr(dotaUserDetails.getPartyMmr());
        }

        DotaUser updatedDotaUser = dotaUserRepository.save(dotaUser);
        return ResponseEntity.ok(updatedDotaUser);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteDotaUser(Long id){
        DotaUser dotaUser = dotaUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        dotaUserRepository.delete(dotaUser);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<User> getUser(Long id) {
        DotaUser dotaUser = dotaUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        return ResponseEntity.ok(dotaUser.getUser());
    }

    @Override
    public Optional<List<DotaUser>> getByTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id : " + teamId));
        return dotaUserRepository.findByTeam(team);
    }
}

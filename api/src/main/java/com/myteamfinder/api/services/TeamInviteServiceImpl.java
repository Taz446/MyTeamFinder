package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.*;
import com.myteamfinder.api.repositories.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TeamInviteServiceImpl implements TeamInviteService{

    private final TeamInviteRepository teamInviteRepository;

    public TeamInviteServiceImpl( TeamInviteRepository teamInviteRepository) {
        this.teamInviteRepository = teamInviteRepository;
    }

    @Override
    public TeamInvite createTeamInvite(TeamInvite teamInvite) {
        return teamInviteRepository.save(teamInvite);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteTeamInvite(Long id) {
        TeamInvite teamInvite = teamInviteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TeamInvite not found with id: " + id));

        teamInviteRepository.delete(teamInvite);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public List<TeamInvite> findByLolUserAndType(LolUser lolUser, String type) {
        return teamInviteRepository.findAllByLolUserAndType(lolUser, type);
    }

    @Override
    public List<TeamInvite> findByDotaUserAndType(DotaUser dotaUser, String type){
        return teamInviteRepository.findAllByDotaUserAndType(dotaUser, type);
    }

    @Override
    public List<TeamInvite> findByTeamAndType(Team team, String type) {
        return teamInviteRepository.findAllByTeamAndType(team, type);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteByLolUser(Long teamInviteId) {
        TeamInvite teamInvite = teamInviteRepository.findById(teamInviteId)
                .orElseThrow(() -> new ResourceNotFoundException("TeamInvite not found with id: " + teamInviteId));

        List<TeamInvite> teamInvites = teamInviteRepository.findAllByLolUser(teamInvite.getLolUser());

        for(TeamInvite ti : teamInvites) {
            teamInviteRepository.delete(ti);
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteByDotaUser(Long teamInviteId) {
        TeamInvite teamInvite = teamInviteRepository.findById(teamInviteId)
                .orElseThrow(() -> new ResourceNotFoundException("TeamInvite not found with id: " + teamInviteId));

        List<TeamInvite> teamInvites = teamInviteRepository.findAllByDotaUser(teamInvite.getDotaUser());

        for(TeamInvite ti : teamInvites) {
            teamInviteRepository.delete(ti);
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteByLolUserAndTeam(Long teamInviteId) {
        TeamInvite teamInvite = teamInviteRepository.findById(teamInviteId)
                .orElseThrow(() -> new ResourceNotFoundException("TeamInvite not found with id: " + teamInviteId));

        List<TeamInvite> teamInvites = teamInviteRepository.findAllByLolUserAndTeam(teamInvite.getLolUser(), teamInvite.getTeam());

        for(TeamInvite ti : teamInvites) {
            teamInviteRepository.delete(ti);
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteByDotaUserAndTeam(Long teamInviteId) {
        TeamInvite teamInvite = teamInviteRepository.findById(teamInviteId)
                .orElseThrow(() -> new ResourceNotFoundException("TeamInvite not found with id: " + teamInviteId));

        List<TeamInvite> teamInvites = teamInviteRepository.findAllByDotaUserAndTeam(teamInvite.getDotaUser(), teamInvite.getTeam());

        for(TeamInvite ti : teamInvites) {
            teamInviteRepository.delete(ti);
        }

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

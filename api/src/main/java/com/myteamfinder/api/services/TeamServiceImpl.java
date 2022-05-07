package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import com.myteamfinder.api.model.User;
import com.myteamfinder.api.repositories.DotaUserRepository;
import com.myteamfinder.api.repositories.LolUserRepository;
import com.myteamfinder.api.repositories.TeamRepository;
import com.myteamfinder.api.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final DotaUserRepository dotaUserRepository;
    private final LolUserRepository lolUserRepository;


    public TeamServiceImpl(TeamRepository teamRepository, UserRepository userRepository, DotaUserRepository dotaUserRepository, LolUserRepository lolUserRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.dotaUserRepository = dotaUserRepository;
        this.lolUserRepository = lolUserRepository;
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public ResponseEntity<Team> getTeamById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("team not found with id : " + id));
        return ResponseEntity.ok(team);
    }

    @Override
    public Team createNewTeam(Team team, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        team.setOwner(user);
        user.setTeamOwned(team);
        return teamRepository.save(team);
    }

    @Override
    public ResponseEntity<Team> updateTeam(Long id, Team teamDetails) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id : " + id));


        team.setOwner(teamDetails.getOwner());
        team.setTeamName(teamDetails.getTeamName());
        team.setLolRegion(teamDetails.getLolRegion());
        team.setAvgLolRank(teamDetails.getAvgLolRank());
        team.setAvgDotaMmr(teamDetails.getAvgDotaMmr());
        team.setAbout(teamDetails.getAbout());

        Team updatedTeam = teamRepository.save(team);
        return ResponseEntity.ok(updatedTeam);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteTeam(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));

        teamRepository.delete(team);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Set<DotaUser>> getDotaUsers(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        return ResponseEntity.ok(team.getDotaUsers());
    }

    @Override
    public ResponseEntity<Set<DotaUser>> addDotaUser(Long id, Long dotaUserId) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        DotaUser dotaUser = dotaUserRepository.findById(dotaUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        team.getDotaUsers().add(dotaUser);
        dotaUser.setTeam(team);
        teamRepository.save(team);
        dotaUserRepository.save(dotaUser);
        return ResponseEntity.ok(team.getDotaUsers());
    }

    @Override
    public ResponseEntity<Set<DotaUser>> removeDotaUser(Long id, Long dotaUserId) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        DotaUser dotaUser = dotaUserRepository.findById(dotaUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        team.getDotaUsers().remove(dotaUser);
        dotaUser.setTeam(null);
        teamRepository.save(team);
        dotaUserRepository.save(dotaUser);
        return ResponseEntity.ok(team.getDotaUsers());
    }

    @Override
    public ResponseEntity<Set<LolUser>> getLolUsers(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        return ResponseEntity.ok(team.getLolUsers());
    }

    @Override
    public ResponseEntity<Set<LolUser>> addLolUser(Long id, Long dotaUserId) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        LolUser lolUser = lolUserRepository.findById(dotaUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        team.getLolUsers().add(lolUser);
        lolUser.setTeam(team);
        teamRepository.save(team);
        lolUserRepository.save(lolUser);
        return ResponseEntity.ok(team.getLolUsers());
    }

    @Override
    public ResponseEntity<Set<LolUser>> removeLolUser(Long id, Long dotaUserId) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        LolUser lolUser = lolUserRepository.findById(dotaUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        team.getLolUsers().remove(lolUser);
        lolUser.setTeam(null);
        teamRepository.save(team);
        lolUserRepository.save(lolUser);
        return ResponseEntity.ok(team.getLolUsers());
    }

    @Override
    public ResponseEntity<User> getOwner(Long id){
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
        return ResponseEntity.ok(team.getOwner());
    }
}

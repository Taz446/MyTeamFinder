package com.myteamfinder.api.repositories;

import com.myteamfinder.api.model.LolUser;
import com.myteamfinder.api.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LolUserRepository extends JpaRepository<LolUser, Long> {
    Optional<List<LolUser>> findByTeam(Team team);
}

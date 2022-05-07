package com.myteamfinder.api.repositories;

import com.myteamfinder.api.model.DotaUser;
import com.myteamfinder.api.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DotaUserRepository extends JpaRepository<DotaUser, Long> {
    Optional<List<DotaUser>> findByTeam(Team team);
}

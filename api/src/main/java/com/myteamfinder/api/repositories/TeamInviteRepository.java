package com.myteamfinder.api.repositories;

import com.myteamfinder.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamInviteRepository extends JpaRepository<TeamInvite, Long>{
    List<TeamInvite> findAllByLolUserAndType(LolUser lolUser, String type);
    List<TeamInvite> findAllByDotaUserAndType(DotaUser dotaUser, String type);
    List<TeamInvite> findAllByTeamAndType(Team team, String type);

    List<TeamInvite> findAllByLolUserAndTeam(LolUser lolUser, Team team);
    List<TeamInvite> findAllByDotaUserAndTeam(DotaUser dotaUser, Team team);

    List<TeamInvite> findAllByLolUser(LolUser lolUser);
    List<TeamInvite> findAllByDotaUser(DotaUser dotaUser);
}

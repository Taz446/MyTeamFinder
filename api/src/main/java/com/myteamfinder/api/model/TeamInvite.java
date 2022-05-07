package com.myteamfinder.api.model;

import javax.persistence.*;

@Entity
@Table(name = "team_invites")
public class TeamInvite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "id", nullable = false)
    private Team team;

    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id", nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "lol_user_id", referencedColumnName = "id")
    private LolUser lolUser;

    @ManyToOne
    @JoinColumn(name = "dota_user_id", referencedColumnName = "id")
    private DotaUser dotaUser;

    public TeamInvite() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public LolUser getLolUser() {
        return lolUser;
    }

    public void setLolUser(LolUser lolUser) {
        this.lolUser = lolUser;
    }

    public DotaUser getDotaUser() {
        return dotaUser;
    }

    public void setDotaUser(DotaUser dotaUser) {
        this.dotaUser = dotaUser;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}

package com.myteamfinder.api.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id", unique = true)
    private User owner;

    @Column(name = "team_name", nullable = false, unique = true)
    private String teamName;
    @Column(name="lol_region")
    private String lolRegion;
    @Column(name = "avg_lol_rank")
    private String avgLolRank;
    @Column(name = "avg_dota_mmr")
    private Integer avgDotaMmr;
    @Column(name = "about")
    private String about;

    @JsonIgnore
    @OneToMany
    private Set<DotaUser> dotaUsers;

    @JsonIgnore
    @OneToMany
    private Set<LolUser> lolUsers;

    @JsonIgnore
    @OneToMany
    private Set<TeamInvite> teamInvites;

    public Team() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getLolRegion() {
        return lolRegion;
    }

    public void setLolRegion(String lolRegion) {
        this.lolRegion = lolRegion;
    }

    public String getAvgLolRank() {
        return avgLolRank;
    }

    public void setAvgLolRank(String avgLolRank) {
        this.avgLolRank = avgLolRank;
    }

    public Integer getAvgDotaMmr() {
        return avgDotaMmr;
    }

    public void setAvgDotaMmr(Integer avgDotaMmr) {
        this.avgDotaMmr = avgDotaMmr;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Set<DotaUser> getDotaUsers() {
        return dotaUsers;
    }

    public void setDotaUsers(Set<DotaUser> dotaUsers) {
        this.dotaUsers = dotaUsers;
    }

    public Set<LolUser> getLolUsers() {
        return lolUsers;
    }

    public void setLolUsers(Set<LolUser> lolUsers) {
        this.lolUsers = lolUsers;
    }

    public Set<TeamInvite> getTeamInvites() {
        return teamInvites;
    }

    public void setTeamInvites(Set<TeamInvite> teamInvites) {
        this.teamInvites = teamInvites;
    }
}

package com.myteamfinder.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "dota_users")
public class DotaUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "dota_id", nullable = false, unique = true)
    private String dotaId;

    @Column(name = "dota_exp")
    private String dotaExp;
    @Column(name = "dota_name", nullable = false)
    private String dotaName;
    @Column(name = "solo_mmr")
    private Long soloMmr;
    @Column(name = "party_mmr")
    private Long partyMmr;

    private Boolean carry;
    private Boolean mid2;
    private Boolean offlane;
    private Boolean farmSupport;
    private Boolean hardSupport;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @JsonIgnore
    @OneToOne(mappedBy = "dotaUser")
    private User user;

    @JsonIgnore
    @OneToMany
    private Set<TeamInvite> teamInvites;

    public DotaUser() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDotaId() {
        return dotaId;
    }

    public void setDotaId(String dotaId) {
        this.dotaId = dotaId;
    }

    public String getDotaExp() {
        return dotaExp;
    }

    public void setDotaExp(String dotaExp) {
        this.dotaExp = dotaExp;
    }

    public String getDotaName() {
        return dotaName;
    }

    public void setDotaName(String dotaName) {
        this.dotaName = dotaName;
    }

    public Long getSoloMmr() {
        return soloMmr;
    }

    public void setSoloMmr(Long soloMmr) {
        this.soloMmr = soloMmr;
    }

    public Long getPartyMmr() {
        return partyMmr;
    }

    public void setPartyMmr(Long partyMmr) {
        this.partyMmr = partyMmr;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<TeamInvite> getTeamInvites() {
        return teamInvites;
    }

    public void setTeamInvites(Set<TeamInvite> teamInvites) {
        this.teamInvites = teamInvites;
    }

    public Boolean getCarry() {
        return carry;
    }

    public void setCarry(Boolean carry) {
        this.carry = carry;
    }

    public Boolean getMid2() {
        return mid2;
    }

    public void setMid2(Boolean mid2) {
        this.mid2 = mid2;
    }

    public Boolean getOfflane() {
        return offlane;
    }

    public void setOfflane(Boolean offlane) {
        this.offlane = offlane;
    }

    public Boolean getFarmSupport() {
        return farmSupport;
    }

    public void setFarmSupport(Boolean farmSupport) {
        this.farmSupport = farmSupport;
    }

    public Boolean getHardSupport() {
        return hardSupport;
    }

    public void setHardSupport(Boolean hardSupport) {
        this.hardSupport = hardSupport;
    }
}

package com.myteamfinder.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "lol_users")
public class LolUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "lol_id", nullable = false, unique = true)
    private String lolId;

    @Column(name = "lol_exp")
    private String lolExp;
    @Column(name = "summoner_name", nullable = false)
    private String summonerName;
    @Column(name = "`rank`")
    private String rank;
    @Column(name = "rank_level")
    private Integer rankLevel;
    @Column(name = "region", nullable = false, columnDefinition = "VARCHAR(15) default 'EUN1'")
    private String lolRegion;

    private Boolean top;
    private Boolean jungle;
    private Boolean mid;
    private Boolean bottom;
    private Boolean support;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @JsonIgnore
    @OneToOne(mappedBy = "lolUser")
    private User user;

    @JsonIgnore
    @OneToMany
    private Set<TeamInvite> teamInvites;

    public Integer rankLevelTranslator() {
        switch(this.rank) {
            case "IRON_IV":
                return 1;
            case "IRON_III":
                return 2;
            case "IRON_II":
                return 3;
            case "IRON_I":
                return 4;
            case "BRONZE_IV":
                return 5;
            case "BRONZE_III":
                return 6;
            case "BRONZE_II":
                return 7;
            case "BRONZE_I":
                return 8;
            case "SILVER_IV":
                return 9;
            case "SILVER_III":
                return 10;
            case "SILVER_II":
                return 11;
            case "SILVER_I":
                return 12;
            case "GOLD_IV":
                return 13;
            case "GOLD_III":
                return 14;
            case "GOLD_II":
                return 15;
            case "GOLD_I":
                return 16;
            case "PLATINUM_IV":
                return 17;
            case "PLATINUM_III":
                return 18;
            case "PLATINUM_II":
                return 19;
            case "PLATINUM_I":
                return 20;
            case "DIAMOND_IV":
                return 21;
            case "DIAMOND_III":
                return 22;
            case "DIAMOND_II":
                return 23;
            case "DIAMOND_I":
                return 24;
            case "MASTER":
                return 25;
            case "GRANDMASTER":
                return 26;
            case "CHALLENGER":
                return 27;
            default:
                return 0;
        }
    }

    public LolUser() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLolId() {
        return lolId;
    }

    public void setLolId(String lolId) {
        this.lolId = lolId;
    }

    public String getLolExp() {
        return lolExp;
    }

    public void setLolExp(String lolExp) {
        this.lolExp = lolExp;
    }

    public String getSummonerName() {
        return summonerName;
    }

    public void setSummonerName(String summonerName) {
        this.summonerName = summonerName;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public Integer getRankLevel() {
        return rankLevel;
    }

    public void setRankLevel(Integer rankLevel) {
        this.rankLevel = rankLevel;
    }

    public String getLolRegion() {
        return lolRegion;
    }

    public void setLolRegion(String lolRegion) {
        this.lolRegion = lolRegion;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Set<TeamInvite> getTeamInvites() {
        return teamInvites;
    }

    public void setTeamInvites(Set<TeamInvite> teamInvites) {
        this.teamInvites = teamInvites;
    }

    public Boolean getTop() {
        return top;
    }

    public void setTop(Boolean top) {
        this.top = top;
    }

    public Boolean getJungle() {
        return jungle;
    }

    public void setJungle(Boolean jungle) {
        this.jungle = jungle;
    }

    public Boolean getMid() {
        return mid;
    }

    public void setMid(Boolean mid) {
        this.mid = mid;
    }

    public Boolean getBottom() {
        return bottom;
    }

    public void setBottom(Boolean bottom) {
        this.bottom = bottom;
    }

    public Boolean getSupport() {
        return support;
    }

    public void setSupport(Boolean support) {
        this.support = support;
    }
}

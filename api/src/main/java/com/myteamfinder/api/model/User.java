package com.myteamfinder.api.model;

import com.myteamfinder.api.model.enumerators.UserType;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "display_name", nullable = false, unique = true)
    private String displayName;
    @Column(name = "google_id", unique = true)
    private String googleId;
    @Column(name = "country")
    private String country;

    @Column(name = "password")
    private String password;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "user_type", nullable = false, columnDefinition = "VARCHAR(15) default 'USER'")
    private UserType userType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lol_user_id", referencedColumnName = "id", unique = true)
    private LolUser lolUser;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dota_user_id", referencedColumnName = "id", unique = true)
    private DotaUser dotaUser;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "team_owned_id", referencedColumnName = "id", unique = true)
    private Team teamOwned;

    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Team getTeamOwned() {
        return teamOwned;
    }

    public void setTeamOwned(Team teamOwned) {
        this.teamOwned = teamOwned;
    }
}

package com.myteamfinder.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;


@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id", nullable = false)
    private Game game;

    @Column(name = "post_type", nullable = false)
    private String postType;

    @Column(name = "content", nullable = false, columnDefinition = "VARCHAR(90)")
    private String content;

    @Column(name = "timestamp")
    private Timestamp timestamp;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lol_filters_id", referencedColumnName = "id")
    private LolFilters lolFilters;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dota_filters_id", referencedColumnName = "id")
    private DotaFilters dotaFilters;

    @PrePersist
    protected void onCreate() {
        timestamp = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Post() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getPostType() {
        return postType;
    }

    public void setPostType(String postType) {
        this.postType = postType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public LolFilters getLolFilters() {
        return lolFilters;
    }

    public void setLolFilters(LolFilters lolFilters) {
        this.lolFilters = lolFilters;
    }

    public DotaFilters getDotaFilters() {
        return dotaFilters;
    }

    public void setDotaFilters(DotaFilters dotaFilters) {
        this.dotaFilters = dotaFilters;
    }
}

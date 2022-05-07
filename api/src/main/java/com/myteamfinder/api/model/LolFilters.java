package com.myteamfinder.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "lol_filters")
public class LolFilters {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @OneToOne(mappedBy = "lolFilters")
    private Post post;

    private String region;
    @Column(name = "`rank`")
    private Integer rank;
    private Boolean top;
    private Boolean jungle;
    private Boolean mid;
    private Boolean bottom;
    private Boolean support;

    public LolFilters() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
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

package com.myteamfinder.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "dota_filters")
public class DotaFilters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @OneToOne(mappedBy = "dotaFilters")
    private Post post;

    private Integer mmr;
    private Boolean carry;
    private Boolean mid2;
    private Boolean offlane;
    private Boolean farmSupport;
    private Boolean hardSupport;

    public DotaFilters() {
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

    public Integer getMmr() {
        return mmr;
    }

    public void setMmr(Integer mmr) {
        this.mmr = mmr;
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

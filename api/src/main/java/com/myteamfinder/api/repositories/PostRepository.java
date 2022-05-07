package com.myteamfinder.api.repositories;

import com.myteamfinder.api.model.Game;
import com.myteamfinder.api.model.Post;
import com.myteamfinder.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByPostTypeAndGame(String postType, Game game);
    List<Post> findAllByUser(User user);
}

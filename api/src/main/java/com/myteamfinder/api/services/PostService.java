package com.myteamfinder.api.services;

import com.myteamfinder.api.model.Comment;
import com.myteamfinder.api.model.Post;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface PostService {
    
    List<Post> getAllPosts();

    ResponseEntity<Post> getPostById(Long id);

    Post createNewPost(Post post);

    ResponseEntity<Post> updatePost(Long id, Post post);

    ResponseEntity<Map<String, Boolean>> deletePost(Long id);

    ResponseEntity<Set<Comment>> getComments(Long id);

    ResponseEntity<Set<Comment>> addComment(Long id, Comment comment);

    ResponseEntity<Set<Comment>> removeComment(Long commentId);

    List<Post> getPostsByTypeAndGame(String postType, Long id);
}

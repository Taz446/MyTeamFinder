package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.Comment;
import com.myteamfinder.api.model.Game;
import com.myteamfinder.api.model.Post;
import com.myteamfinder.api.repositories.CommentRepository;
import com.myteamfinder.api.repositories.GameRepository;
import com.myteamfinder.api.repositories.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final GameRepository gameRepository;

    public PostServiceImpl(PostRepository postRepository, CommentRepository commentRepository, GameRepository gameRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public ResponseEntity<Post> getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id : " + id));
        return ResponseEntity.ok(post);
    }

    @Override
    public Post createNewPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public ResponseEntity<Post> updatePost(Long id, Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id : " + id));

        post.setContent(postDetails.getContent());
        post.setLolFilters(postDetails.getLolFilters());
        post.setDotaFilters(postDetails.getDotaFilters());

        Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(updatedPost);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        postRepository.delete(post);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Set<Comment>> getComments(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        return ResponseEntity.ok(post.getComments());
    }

    @Override
    public ResponseEntity<Set<Comment>> addComment(Long id, Comment comment) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        post.getComments().add(comment);
        comment.setPost(post);
        postRepository.save(post);
        commentRepository.save(comment);
        return ResponseEntity.ok(post.getComments());
    }

    @Override
    public ResponseEntity<Set<Comment>> removeComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        Post post = comment.getPost();

        post.getComments().remove(comment);
        postRepository.save(post);
        commentRepository.delete(comment);
        return ResponseEntity.ok(post.getComments());
    }

    @Override
    public List<Post> getPostsByTypeAndGame(String postType, Long id){
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + id));
        return postRepository.findAllByPostTypeAndGame(postType, game);
    }
}

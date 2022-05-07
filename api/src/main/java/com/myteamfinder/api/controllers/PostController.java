package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.Comment;
import com.myteamfinder.api.model.Post;
import com.myteamfinder.api.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Post> getPosts() {
        return postService.getAllPosts();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post postPost(@RequestBody Post post) {
        return postService.createNewPost(post);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Post> putPost(@PathVariable Long id, @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deletePost(@PathVariable Long id) {
        return postService.deletePost(id);
    }

    @GetMapping({"/{id}/comments"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<Comment>> getComments(@PathVariable Long id) {
        return postService.getComments(id);
    }

    @PutMapping("/{id}/add-comment")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<Comment>> addComment(@PathVariable Long id, @RequestBody Comment comment) {
        return postService.addComment(id, comment);
    }

    @PutMapping("/remove-comment/{commentId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<Comment>> removeComment(@PathVariable Long commentId) {
        return postService.removeComment(commentId);
    }

    @GetMapping("/{gameId}/{postType}")
    @ResponseStatus(HttpStatus.OK)
    public List<Post> getPostsByTypeAndGame(@PathVariable Long gameId, @PathVariable String postType) {
        return postService.getPostsByTypeAndGame(postType, gameId);
    }
}

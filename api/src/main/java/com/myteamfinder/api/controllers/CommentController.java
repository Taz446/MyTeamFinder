package com.myteamfinder.api.controllers;

import com.myteamfinder.api.model.Comment;
import com.myteamfinder.api.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Comment> getComments() {
        return commentService.getAllComments();
    }

    @GetMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Comment> getComment(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Comment postComment(@RequestBody Comment comment, @RequestBody Long postId) {
        return commentService.createNewComment(comment, postId);
    }

    @PutMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Comment> putComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    @DeleteMapping({"/{id}"})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, Boolean>> deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }
}

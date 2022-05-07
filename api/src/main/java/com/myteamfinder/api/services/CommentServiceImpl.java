package com.myteamfinder.api.services;

import com.myteamfinder.api.exceptions.ResourceNotFoundException;
import com.myteamfinder.api.model.Comment;
import com.myteamfinder.api.model.Post;
import com.myteamfinder.api.repositories.CommentRepository;
import com.myteamfinder.api.repositories.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public ResponseEntity<Comment> getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id : " + id));
        return ResponseEntity.ok(comment);
    }

    @Override
    public Comment createNewComment(Comment comment, Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        post.getComments().add(comment);
        comment.setPost(post);
        postRepository.save(post);
        return commentRepository.save(comment);
    }

    @Override
    public ResponseEntity<Comment> updateComment(Long id, Comment commentDetails) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id : " + id));

        if (commentDetails.getContent() != null) {
            comment.setContent(commentDetails.getContent());
        }
        if (commentDetails.getTimestamp() != null) {
            comment.setTimestamp(commentDetails.getTimestamp());
        }

        Comment updatedComment = commentRepository.save(comment);
        return ResponseEntity.ok(updatedComment);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));

        commentRepository.delete(comment);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

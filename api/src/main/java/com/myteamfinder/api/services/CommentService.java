package com.myteamfinder.api.services;

import com.myteamfinder.api.model.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CommentService {

    List<Comment> getAllComments();

    ResponseEntity<Comment> getCommentById(Long id);

    Comment createNewComment(Comment comment, Long id);

    ResponseEntity<Comment> updateComment(Long id, Comment comment);

    ResponseEntity<Map<String, Boolean>> deleteComment(Long id);
}

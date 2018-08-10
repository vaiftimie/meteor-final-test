import { Meteor } from 'meteor/meteor'
import CommentService from '/imports/api/comments/services/CommentService';
import PostService from '/imports/api/posts/services/PostService';

Meteor.methods({
    'comments.create'(comment) {
        CommentService.create(comment);
        PostService.incrementComments(comment.postId);
    },

    'comments.remove'(comment) {
        CommentService.remove(comment);
        PostService.decrementComments(comment.postId);
    },

    'comments.getCommentsByPostId'(postId) {
        return CommentService.getComments(postId);
    }
});
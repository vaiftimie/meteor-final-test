import { Meteor } from 'meteor/meteor'
import CommentService from '/imports/api/comments/services/CommentService';

Meteor.methods({
    'comments.create'(comment) {
        CommentService.create(comment);
    },

    'comments.remove'(id) {
        CommentService.remove(id);
    },

    'comments.getCommentsByPostId'(postId) {
        return CommentService.getComments(postId);
    }
});
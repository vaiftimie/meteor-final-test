import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';

Meteor.methods({
    'comments.create'(comment) {
        Comments.insert(comment);
    },

    'comments.remove'(_id) {
        Comments.remove(_id);
    },

    'comments.getCommentsByPostId' (_postId) {
        return Comments.find({postId: _postId}).fetch();
    }
});
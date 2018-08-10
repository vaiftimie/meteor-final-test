import { Meteor } from 'meteor/meteor'
import PostService from '/imports/api/posts/services/PostService';

Meteor.methods({
    'post.get'(_id) {
        PostService.incrementViews(_id);
        return PostService.get(_id);
    },

    'post.list'() {
        return PostService.getAll();
    },

    'post.create'(post) {
        PostService.create(post);
    },

    'post.remove'(_id) {
        PostService.remove(_id);
    },

    'post.edit'(_id, post) {
        PostService.edit(_id, post);
    },

    'post.incrementViews'(_id) {
        PostService.incrementViews(_id);
    },

    'post.incrementComments'(_id) {
        PostService.incrementComments(_id);
    },

    'post.decrementComments'(_id) {
        PostService.decrementComments(_id);
    }
});
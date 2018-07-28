import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type
            }
        });
    },

    'post.incrementViews' (_id) {
        let post = Posts.findOne(_id);
        post.views++;

        Posts.update(_id, {
            $set: {
                views: post.views,
            }
        });

        return post;
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    }
});
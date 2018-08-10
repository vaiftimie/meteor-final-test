import { Meteor } from 'meteor/meteor';
import Posts from '/db/posts/collection';
import Comments from '/db/comments/collection';

Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('post', function (postId) {
    return Posts.find({ _id: postId });
});

Meteor.publish('comments', function (postId) {
    return Comments.find({ postId: postId });
});
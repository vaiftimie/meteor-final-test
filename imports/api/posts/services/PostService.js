import postQuery from '/imports/api/posts/queries/getPost';
import postsQuery from '/imports/api/posts/queries/getPosts';
import { Posts } from '/db';
import { Comments } from '/db';

class PostService {
    static get(_id) {
        return postQuery.clone({ _id: _id }).fetchOne();
    }

    static getAll() {
        return postsQuery.clone().fetch();
    }

    static create(post) {
        Posts.insert(post);
    }

    static remove(_id) {
        Comments.remove({ postId: _id });
        Posts.remove(_id);
    }

    static edit(_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type
            }
        });
    }

    static incrementViews(_id) {
        let post = Posts.findOne(_id);
        post.views++;

        Posts.update(_id, {
            $set: {
                views: post.views,
            }
        });

        return post;
    }

    static incrementComments(_id) {
        let post = Posts.findOne(_id);
        post.commentsNumber++;

        Posts.update(_id, {
            $set: {
                commentsNumber: post.commentsNumber,
            }
        });

        return post;
    }

    static decrementComments(_id) {
        let post = Posts.findOne(_id);
        post.commentsNumber--;

        Posts.update(_id, {
            $set: {
                commentsNumber: post.commentsNumber,
            }
        });

        return post;
    }
}

export default PostService;
import { Comments } from '/db';
import commentsQuery from '/imports/api/comments/queries/getComments';

class CommentService {
    static create(comment) {
        Comments.insert(comment);
    }

    static remove(comment) {
        Comments.remove(comment._id);
    }

    static getComments(postId) {
        return commentsQuery.clone({ postId: postId }).fetch();
    }
}

export default CommentService;
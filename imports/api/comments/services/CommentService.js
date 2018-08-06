import { Comments } from '/db';
import commentsQuery from '/imports/api/comments/queries/getComments';

class CommentService {
    static create(comment) {
        Comments.insert(comment);
    }

    static remove(commentId) {
        Comments.remove(commentId);
    }

    static getComments(postId) {
        return commentsQuery.clone({ postId: postId }).fetch();
    }
}

export default CommentService;
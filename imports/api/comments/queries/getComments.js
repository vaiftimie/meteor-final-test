import { Comments } from '/db';

export default Comments.createQuery({
    $filter({ filters, params, options }) {
        filters.postId = params.postId
    },
    $options: { sort: { createdAt: 1 } },
    userId: 1,
    postId: 1,
    text: 1,
    createdAt: 1,
    userEmail: 1
});
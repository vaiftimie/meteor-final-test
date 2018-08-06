import { Posts } from '/db';

export default Posts.createQuery({
    $filter({ filters, params, options }) {
        filters._id = params._id
    },
    $options: {},
    title: 1,
    description: 1,
    userId: 1,
    views: 1,
    commentsNumber: 1,
    createdAt: 1,
    type: 1
});
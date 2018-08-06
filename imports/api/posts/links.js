import {Posts} from '/db';
import {Users} from '/db';
import {Comments} from '/db';

Posts.addLinks({
    userLink: {
        type: 'one',
        collection: Users,
        field: 'user'
    },
    commentsLink: {
        type: 'many',
        collection: Comments,
        field: 'comments'
    }
});
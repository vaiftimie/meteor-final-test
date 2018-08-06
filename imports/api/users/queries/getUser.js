import { Users } from '/db';

export default Users.createQuery({
    $filter({ filters, params, options }) {
        filters._id = params._id
    },
    $options: {},
    _id: 1,
    emails: 1,
    'emails.$': 1,
    'emails.$.address': 1,
    'emails.$.verified': 1,
    createdAt: 1,
    services: 1
});
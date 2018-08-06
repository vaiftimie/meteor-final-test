import {Meteor} from 'meteor/meteor'
import {Users} from '/db';
import userQuery from '/imports/api/users/queries/getUser';

class UserService {
    static registerUser(data) {
        const user = Users.findOne({'emails.0.address': data.email});

        if (user) {
            throw new Meteor.Error(500, 'email_already_taken',
                'Email already taken');
        }

        Accounts.createUser({
            email: data.email,
            password: data.password
        });
    }

    static getUser(_id) {
        return userQuery.clone({_id : _id}).fetchOne();
    }
}

export default UserService;
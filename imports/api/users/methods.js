import { Meteor } from 'meteor/meteor'
import UserService from '/imports/api/users/services/UserService';

Meteor.methods({
    'user.register'(data) {
        UserService.registerUser(data);
    },

    'user.get'(_id) {
        return UserService.getUser(_id);
    }
});
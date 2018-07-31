import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    userId: {
        type: String,
        optional: false
    },
    postId: {
        type: String,
        optional: false
    },
    text: String,
    createdAt: Date,
    userEmail: String
});
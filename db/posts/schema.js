import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: false
    },
    views: Number,
    commentsNumber: Number,
    createdAt: Date,
    type: String
});
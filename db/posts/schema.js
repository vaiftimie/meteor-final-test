import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: Number,
    createdAt: Date,
    type: String
});
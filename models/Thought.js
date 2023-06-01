const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema
    .virtual('getReaction')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
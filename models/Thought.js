const mongoose = require('mongoose');

const Thought = mongoose.model('Thought', thoughtSchema);
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
            return this.createdAt.toLocaleString();
        }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
});

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
            return this.createdAt.toLocaleString();
        }
    }
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;
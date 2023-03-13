const mongoose = require('mongoose')

const User = mongoose.model('User', UserSchema);

const UserSchema = new mongoose.Schema({
    username: {type: String, 
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/,'Please enter a valid email address']
    },
    thoughts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;


const { Schema, model } = require('mongoose');

const postSchema = Schema({
  content: {
    text: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      comment: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

module.exports = model('Post', postSchema);

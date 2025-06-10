const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    author: {
      type: String,
      default: 'Anonymous',
    },
    publicationDate: {
      type: Date,
      default: Date.now, // Optional: sets to current date/time by default
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Post', postSchema);

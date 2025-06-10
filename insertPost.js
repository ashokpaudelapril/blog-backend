const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const fs = require('fs'); // Node.js built-in file system module
const path = require('path'); // Node.js built-in path module

const Post = require('./models/Post');

const mongoURI = process.env.MONGO_URI;
const postDataFilePath = path.join(__dirname, 'new-post.json'); // Path to your JSON file

const insertPostFromFile = async () => {
  if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in backend/.env');
    process.exit(1);
  }

  // Read the post data from the JSON file
  let newPostData;
  try {
    const fileContent = fs.readFileSync(postDataFilePath, 'utf8');
    newPostData = JSON.parse(fileContent);
    console.log('Successfully loaded post data from', postDataFilePath);
  } catch (readError) {
    console.error(`Error reading or parsing ${postDataFilePath}:`, readError.message);
    console.error('Please ensure the file exists and contains valid JSON.');
    process.exit(1);
  }

  // Input validation (basic)
  if (!newPostData.title || !newPostData.content || !newPostData.author) {
    console.error('Error: Missing required fields (title, content, or author) in new-post.json');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for insertion script!');

    const newPost = new Post(newPostData);
    await newPost.save();
    console.log(`Post "${newPost.title}" inserted successfully!`);

  } catch (error) {
    console.error('Error inserting post:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

insertPostFromFile();
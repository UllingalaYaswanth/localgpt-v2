// // models/Group.js
// import mongoose from "mongoose";

// const groupSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
//   created_at: { type: Date, default: Date.now },
//   access_level: { type: String, enum: ['Public', 'Private'], default: 'Public' }
// });

// const Group = mongoose.model('Group', groupSchema);
// export default Group;


import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  documents: [{ type: String }], // Store document names as an array of strings
  access_level: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: true, // Enable createdAt timestamp
    updatedAt: false // Disable updatedAt timestamp
  }
});


const Group = mongoose.model('Group', groupSchema);

export default Group;


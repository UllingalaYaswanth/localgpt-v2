import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  users: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
  ],
  documents: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: {
    currentTime: () => new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
  }
});

const AdminGroup = mongoose.model('AdminGroup', adminGroupSchema);

export default AdminGroup;

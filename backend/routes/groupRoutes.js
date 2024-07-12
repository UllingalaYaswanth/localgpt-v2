import express from 'express';
import Group from '../Models/groupModel.js';

const router = express.Router();

// Route to create a new group
router.post('/admin/groups', async (req, res) => {
  try {
    const { name, users, documents, access_level } = req.body;
    const group = new Group({
      name,
      users,
      documents,
      access_level,
    });
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all groups with their respective accounts and documents
router.get('/admin/groups', async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('users', 'firstName lastName emailAddress')
      .populate('documents', 'name path_lower location');

    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch a single group by ID with its respective accounts and documents
router.get('/admin/groups:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate('users', 'firstName lastName emailAddress')
      .populate('documents', 'name path_lower location');

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

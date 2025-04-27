import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, entryDate, moodColor, reflection, imageUrl } = req.body;

    const newEntry = await Entry.create({
      userId,
      entryDate,
      moodColor,
      reflection,
      imageUrl
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create entry' });
  }
});

export default router;

const express = require('express');
const router = express.Router();
const News = require('../models/News.js');

// @route   GET api/news
// @desc    Get all news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/news
// @desc    Create a news article
// @access  Public
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNews = new News({
      title,
      content,
    });

    const news = await newNews.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

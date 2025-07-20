const { Router } = require('express');
const { getAllUniqueJmiNotices } = require('../controllers/scrape.controller'); // Import the new function

const scrapeRouter = Router();

// This new route gets ALL unique notices from the entire page
scrapeRouter.get('/scrape-jmi-all', async (req, res) => {
  try {
    const data = await getAllUniqueJmiNotices();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Scraping failed',
      detail: error.message,
    });
  }
});

module.exports = {
  scrapeRouter,
};
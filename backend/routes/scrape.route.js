import { getJmiNotice } from "../controllers/scrape.controller";

const {Router} = require("express");

const scrapeRouter = Router();

scrapeRouter.get("/scrape-jmi",async (req, res) => {
  try {
    const data = await getJmiNotice();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed', detail: error.message });
  }
});


module.exports = {
    scrapeRouter
}


const mongoose = require('mongoose');

const scrapeSchema = new mongoose.Schema({
        title: { type: String, required: true },
        url: { type: String, required: true },
        date: { type: String },  // Optional date from scraping
        scrapedAt: { type: Date, default: Date.now },  // Timestamp for when scraped
});
    
const Scrape = mongoose.model('Scrape', scrapeSchema);
    
module.exports = Scrape;

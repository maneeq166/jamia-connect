const axios = require("axios");
const cheerio = require("cheerio");
const Scrape = require("../models/Scrape");

async function getAllUniqueJmiNotices() {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);  // 24 hours ago

  // Check if we have recent scrapes (within the last day)
  const recentScrape = await Scrape.findOne({ scrapedAt: { $gte: oneDayAgo } }).sort({ scrapedAt: -1 });

  if (recentScrape) {
    // If scraped within the last day, return cached data
    const allRecent = await Scrape.find({ scrapedAt: { $gte: oneDayAgo } });
    return allRecent.map(doc => ({ title: doc.title, url: doc.url, date: doc.date }));
  }

  // If no recent scrape, perform scraping
  try {
    // Fetch website data
    const { data } = await axios.get("https://jmicoe.in/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const results = [];

    // Scrape marquee notices
    $("marquee a").each((i, el) => {
      const link = $(el).attr("href");
      const title = $(el).text().trim().replace(/\s+/g, " ");
      if (link && title) {
        results.push({
          title,
          url: link.startsWith("http") ? link : `https://jmicoe.in/${link}`,
        });
      }
    });

    // Scrape Admission Notices
    $("#leftPanel ul li a").each((i, el) => {
      const link = $(el).attr("href");
      const title = $(el).text().trim().replace(/\s+/g, " ");
      if (link && title) {
        results.push({
          title,
          url: link.startsWith("http") ? link : `https://jmicoe.in/${link}`,
        });
      }
    });

    // Scrape News & Notifications
    $("#noticePanel ul.news li").each((i, el) => {
      const link = $(el).find("a").attr("href");
      const title = $(el).find("a").text().trim().replace(/\s+/g, " ");
      const date = $(el).find(".news-date").text().trim() || null;
      if (link && title) {
        results.push({
          title,
          url: link.startsWith("http") ? link : `https://jmicoe.in/${link}`,
          date,
        });
      }
    });

    // Scrape Regular Exam
    $("#rightPanel ul li a").each((i, el) => {
      const link = $(el).attr("href");
      const title = $(el).text().trim().replace(/\s+/g, " ");
      if (link && title) {
        results.push({
          title,
          url: link.startsWith("http") ? link : `https://jmicoe.in/${link}`,
        });
      }
    });

    // Scrape other panels
    const otherPanels = ["2ndleftPanel", "3rdrightPanel", "2ndrightPanel", "3rdleftPanel"];
    otherPanels.forEach((id) => {
      $(`[id="${id}"] ul li a`).each((i, el) => {
        const link = $(el).attr("href");
        const title = $(el).text().trim().replace(/\s+/g, " ");
        if (link && title) {
          results.push({
            title,
            url: link.startsWith("http") ? link : `https://jmicoe.in/${link}`,
          });
        }
      });
    });

    // Deduplicate by URL
    const uniqueMap = new Map();
    results.forEach((item) => {
      if (!uniqueMap.has(item.url)) uniqueMap.set(item.url, item);
    });
    const uniqueResults = Array.from(uniqueMap.values());

    // Clear old scrapes (older than 1 day) to avoid accumulation
    await Scrape.deleteMany({ scrapedAt: { $lt: oneDayAgo } });

    // Save unique results to DB
    for (const item of uniqueResults) {
      await Scrape.create({ ...item, scrapedAt: now });
    }

    const logger = require('../utils/logger');
    logger.info(`Scraped and saved ${uniqueResults.length} unique notices`);
    return uniqueResults;
  } catch (error) {
    const logger = require('../utils/logger');
    logger.error("Error during scraping:", error);
    // On error, return any existing data if available
    const allRecent = await Scrape.find({ scrapedAt: { $gte: oneDayAgo } });
    return allRecent.map(doc => ({ title: doc.title, url: doc.url, date: doc.date }));
  }
}

module.exports = { getAllUniqueJmiNotices };

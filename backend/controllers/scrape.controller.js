// const puppeteer = require('puppeteer');

// /**
//  * Scrapes all notice panels from jmicoe.in and returns a single list of unique notices.
//  * @returns {Promise<Array<Object>>} A promise that resolves to a de-duplicated array of all notices.
//  */
// async function getAllUniqueJmiNotices() {
// try {
//   console.log("Launching Puppeteer browser...");
//   const browser = await puppeteer.launch({
//   headless: 'new',
//   args: [
//     '--no-sandbox',
//     '--disable-setuid-sandbox',
//     '--disable-dev-shm-usage',
//     '--disable-gpu',
//   ],
  
// });

// } catch (err) {
//   console.error("Puppeteer launch failed:", err.message);
//   throw err;
// }


//   const page = await browser.newPage();

//   try {
//     console.log('Navigating to https://jmicoe.in/');
//     await page.goto('https://jmicoe.in/', { waitUntil: 'networkidle2' });

//     console.log('Scraping notice sections...');
//     const allNotices = await page.evaluate(() => {
//       let results = [];

//       // Helper function to scrape a panel and add to results
//       const scrapePanel = (selector, isNewsPanel = false) => {
//         const items = document.querySelectorAll(selector);
//         items.forEach(item => {
//           const link = item.querySelector('a');
//           if (link && link.innerText.trim() && !item.classList.contains('head')) {
//             const notice = {
//               title: link.innerText.trim().replace(/\s+/g, ' '),
//               url: link.href,
//             };
//             if (isNewsPanel) {
//               const dateSpan = item.querySelector('.news-date');
//               notice.date = dateSpan ? dateSpan.innerText.trim() : null;
//             }
//             results.push(notice);
//           }
//         });
//       };
      
//       // Scrape all relevant panels using valid selectors
//       scrapePanel('marquee a');
//       scrapePanel('#leftPanel ul li'); // Admission Notices
//       scrapePanel('#noticePanel ul.news li', true); // News & Notifications (with date)
//       scrapePanel('#rightPanel ul li'); // Regular Exam
//       scrapePanel('[id="2ndleftPanel"] ul li'); // Private Courses
//       scrapePanel('[id="3rdrightPanel"] ul li'); // Ph.D. Courses
//       scrapePanel('[id="2ndrightPanel"] ul li'); // Foreign/NRI Student
//       scrapePanel('[id="3rdleftPanel"] ul li'); // Student's Grievances

//       return results;
//     });
    
//     // --- Deduplication Logic ---
//     const uniqueNoticesMap = new Map();
//     allNotices.forEach(notice => {
//       if (!uniqueNoticesMap.has(notice.url)) {
//         uniqueNoticesMap.set(notice.url, notice);
//       }
//     });

//     const uniqueNotices = Array.from(uniqueNoticesMap.values());

//     console.log(`Scraping complete. Found ${allNotices.length} notices, returning ${uniqueNotices.length} unique items.`);
//     return uniqueNotices;

//   } catch (error) {
//     console.error('Error during scraping:', error.message);
//     throw new Error('Failed to scrape the JMI website.');
//   } finally {
//     await browser.close();
//     console.log('Browser instance closed.');
//   }
// }

// module.exports = {
//   getAllUniqueJmiNotices,
// };

const axios = require("axios");
const cheerio = require("cheerio");

async function getAllUniqueJmiNotices() {
  const { data } = await axios.get("https://jmicoe.in/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
    },
  });

  const $ = cheerio.load(data);
  const results = [];

  // --- Scrape the marquee notices ---
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

  // --- Scrape Admission Notices ---
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

  // --- Scrape News & Notifications ---
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

  // --- Scrape Regular Exam ---
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

  // --- Scrape other panels using attribute selectors ---
  const otherPanels = [
    "2ndleftPanel",
    "3rdrightPanel",
    "2ndrightPanel",
    "3rdleftPanel",
  ];

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

  // --- Deduplicate by URL ---
  const uniqueMap = new Map();
  results.forEach((item) => {
    if (!uniqueMap.has(item.url)) uniqueMap.set(item.url, item);
  });

  const uniqueResults = Array.from(uniqueMap.values());
  console.log(`Scraped ${uniqueResults.length} unique notices`);

  return uniqueResults;
}

module.exports = { getAllUniqueJmiNotices };

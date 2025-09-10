const puppeteer = require('puppeteer');

/**
 * Scrapes all notice panels from jmicoe.in and returns a single list of unique notices.
 * @returns {Promise<Array<Object>>} A promise that resolves to a de-duplicated array of all notices.
 */
async function getAllUniqueJmiNotices() {
try {
  console.log("Launching Puppeteer browser...");
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    executablePath: '/usr/bin/chromium',
  });
} catch (err) {
  console.error("Puppeteer launch failed:", err.message);
  throw err;
}


  const page = await browser.newPage();

  try {
    console.log('Navigating to https://jmicoe.in/');
    await page.goto('https://jmicoe.in/', { waitUntil: 'networkidle2' });

    console.log('Scraping notice sections...');
    const allNotices = await page.evaluate(() => {
      let results = [];

      // Helper function to scrape a panel and add to results
      const scrapePanel = (selector, isNewsPanel = false) => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
          const link = item.querySelector('a');
          if (link && link.innerText.trim() && !item.classList.contains('head')) {
            const notice = {
              title: link.innerText.trim().replace(/\s+/g, ' '),
              url: link.href,
            };
            if (isNewsPanel) {
              const dateSpan = item.querySelector('.news-date');
              notice.date = dateSpan ? dateSpan.innerText.trim() : null;
            }
            results.push(notice);
          }
        });
      };
      
      // Scrape all relevant panels using valid selectors
      scrapePanel('marquee a');
      scrapePanel('#leftPanel ul li'); // Admission Notices
      scrapePanel('#noticePanel ul.news li', true); // News & Notifications (with date)
      scrapePanel('#rightPanel ul li'); // Regular Exam
      scrapePanel('[id="2ndleftPanel"] ul li'); // Private Courses
      scrapePanel('[id="3rdrightPanel"] ul li'); // Ph.D. Courses
      scrapePanel('[id="2ndrightPanel"] ul li'); // Foreign/NRI Student
      scrapePanel('[id="3rdleftPanel"] ul li'); // Student's Grievances

      return results;
    });
    
    // --- Deduplication Logic ---
    const uniqueNoticesMap = new Map();
    allNotices.forEach(notice => {
      if (!uniqueNoticesMap.has(notice.url)) {
        uniqueNoticesMap.set(notice.url, notice);
      }
    });

    const uniqueNotices = Array.from(uniqueNoticesMap.values());

    console.log(`Scraping complete. Found ${allNotices.length} notices, returning ${uniqueNotices.length} unique items.`);
    return uniqueNotices;

  } catch (error) {
    console.error('Error during scraping:', error.message);
    throw new Error('Failed to scrape the JMI website.');
  } finally {
    await browser.close();
    console.log('Browser instance closed.');
  }
}

module.exports = {
  getAllUniqueJmiNotices,
};

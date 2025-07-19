const puppeteer = require('puppeteer');

async function getJmiNotice() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://jmicoe.in/', { waitUntil: 'domcontentloaded' });

  const notices = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.notice a'));
    return links.map(link => ({
      title: link.innerText.trim(),
      url: link.href.endsWith('.pdf') ? link.href : `https://jmicoe.in/${link.getAttribute('href')}`
    }));
  });

  await browser.close();
  return notices;
}

module.exports = {getJmiNotice};

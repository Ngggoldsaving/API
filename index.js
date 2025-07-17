const puppeteer = require('puppeteer');

module.exports = async function scrapeGold() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://nggjewellery.com/gold-wall/th', { waitUntil: 'networkidle2' });

  await page.waitForSelector('label.price.form-label');

  const prices = await page.$$eval('label.price.form-label', els =>
    els.map(el => el.textContent.trim()).filter(t => t)
  );

  await browser.close();

  return {
    timestamp: new Date().toISOString(),
    sell: prices[1] || null,
    buy: prices[2] || null
  };
};

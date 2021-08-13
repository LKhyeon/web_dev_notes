import { Browser } from "puppeteer";
import pageScraper from './pageScraper';

export default async function scrapeAll(browserInstance: Promise<Browser>) {
  let browser: Browser;
  try {
    browser = await browserInstance;
    await pageScraper.scraperObject.scraper(browser);
  } catch (err) {
    console.log('Could not resolve the browser instance: ', err);
  }
}

import { Browser } from "puppeteer";

const scraperObject = {
  url: 'http://books.toscrape.com',
  async scraper(browser: Browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}.`);
    await page.goto(this.url);
    // Wait until the DOM loads and the class is to scrap is visible.
    await page.waitForSelector('.page_inner');
    const urls = await page.$$eval('section ol > li', links => {
      links = links.filter(link => {
        const element = link.querySelector('.instock.availability > i');
        if (element) {
          return element.textContent !== 'In stock';
        }
        return false;
      });
      const strLinks = links.map(el => {
        const anchorEle = <HTMLAnchorElement> el.querySelector('h3 > a');
        return anchorEle.href;
      });
      return strLinks;
    })
    console.log(urls);
  }
}

export default { scraperObject };

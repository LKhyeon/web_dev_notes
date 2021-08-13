import { Browser } from "puppeteer";
import { dataObj } from "./interfaces/pageScraperData";

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
    });

    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link: string) => new Promise(async(resolve, reject) => {
      let dataObj = <dataObj> {};
      let newPage = await browser.newPage();
      await newPage.goto(link);
      dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
      dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
      dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
        // Strip new line and tab spaces
        if (text.textContent) {
          const textStr = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
          // Get the number of stock available
          const regexp = /^.*\((.*)\).*$/i;
          const regexArr = regexp.exec(textStr);
          if (regexArr) {
            return regexArr[1].split(' ')[0];
          }
        }
        return '';
      });
      dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => {
        if (img instanceof HTMLImageElement) {
          return img.src;
        }
        return '';
      });
      dataObj['bookDescription'] = await newPage.$eval('#product_description', div => {
        if (div && div.nextSibling && div.nextSibling.nextSibling) {
          return div.nextSibling.nextSibling.textContent;
        }
        return '';
      });
      dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
      resolve(dataObj);
      await newPage.close();
    });

    for (const link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      // scrapedData.push(currentPageData);
      console.log(currentPageData);
    }
  }
}

export default { scraperObject };

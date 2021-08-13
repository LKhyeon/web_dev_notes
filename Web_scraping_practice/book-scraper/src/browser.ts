import { Browser, launch } from 'puppeteer';

async function startBrowser(): Promise<Browser> {
  console.log('Opening the browser...');
  return await launch({
    headless: true,
    'ignoreHTTPSErrors': true,
  });
}

export default startBrowser;

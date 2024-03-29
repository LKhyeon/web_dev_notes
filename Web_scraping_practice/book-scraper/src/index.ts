import startBrowser from './browser';
import scraperController from './pageController';

//Start the browser and create a browser instance
const browserInstance = startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);

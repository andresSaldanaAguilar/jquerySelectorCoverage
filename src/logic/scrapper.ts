import fetch from "node-fetch";
import cheerioModule = require("cheerio");
const loadedSites = require("../../inputs/sites.json");
const loadedSelectors = require("../../inputs/selectors.json");
const {
  resourcePath,
  useBrowserRender,
  headlessBrowser,
  linkToCrawl,
} = require("../../inputs/configs.json");
const puppeteer = require("puppeteer");

const printProgress = (arr, index, message) => {
  console.log(
    `${message}, (${Math.round(
      ((index + 1) * 100) / arr.length
    )}% completed) ${".".repeat(index % 4)}`
  );
};

const getClickedSites = async () => {
  const clickedSites: string[] = [];
  const browser = await puppeteer.launch({ headless: true });
  for (let i = 0; i < loadedSites.length; i++) {
    const page = await browser.newPage();
    try {
      await page.goto(`${loadedSites[i]}${resourcePath}`);
      await page.click(linkToCrawl);
      await page.waitForSelector("div");
      if (page.url()) clickedSites.push(page.url());
    } catch (error) {}
    page.close();
    console.clear();
    printProgress(loadedSites, i, "Getting new links");
  }
  browser.close();
  return clickedSites;
};

const generateMaps = (sites, selectors) => {
  let selectorsMap = new Map();
  let sitesMap = new Map();
  sites.map((site: string) => {
    sitesMap.set(site, []);
  });
  selectors.map((selector: string) => {
    selectorsMap.set(selector, 0);
  });
  return { selectorsMap, sitesMap };
};

const fetchHTML = async (browser, url) => {
  let page = null;
  try {
    if (browser) {
      page = await browser.newPage();
      await page.goto(url);
      const content = await page.content();
      page.close();
      return content;
    } else {
      page = await fetch(url);
      return await page.text();
    }
  } catch (error) {
    if (browser) page.close();
    return null;
  }
};

const matchSelectors = (
  html,
  sites,
  selectors,
  index,
  selectorsMap,
  sitesMap
) => {
  const $ = cheerioModule.load(html);
  for (const selector of selectors) {
    if ($(selector).length >= 1) {
      sitesMap.get(sites[index]).push(`${selector} (${$(selector).length})`);
      selectorsMap.set(selector, selectorsMap.get(selector) + 1);
    }
  }
  return { selectorsMap, sitesMap };
};

export const scrap = async () => {
  let browser = null;
  let sites = loadedSites;
  let selectors = loadedSelectors;
  if (linkToCrawl) sites = await getClickedSites();
  if (useBrowserRender)
    browser = await puppeteer.launch({ headless: headlessBrowser });
  let { selectorsMap, sitesMap } = generateMaps(sites, selectors);

  for (let i = 0; i < sites.length; i++) {
    const url = linkToCrawl ? sites[i] : `${sites[i]}${resourcePath}`;
    const html = await fetchHTML(browser, url);
    if (html) {
      matchSelectors(html, sites, selectors, i, selectorsMap, sitesMap);
      console.clear();
      printProgress(sites, i, "Matching selectors");
      console.log(selectorsMap);
    }
  }

  if (browser) await browser.close();
  console.clear();
  console.log(
    "\n====================================Results===================================\n"
  );
  console.log(sitesMap);
  console.log(selectorsMap);
};

import fetch from "node-fetch";
import cheerio from "cheerio";
const sites = require("../inputs/sites.json");
const selectors = require("../inputs/selectors.json");
const { resourcePath, useBrowserRender } = require("../inputs/configs.json");
const puppeteer = require("puppeteer");

let selectorsMap = new Map();
let sitesMap = new Map();
sites.map((site: string) => {
  sitesMap.set(site, []);
});
selectors.map((selector: string) => {
  selectorsMap.set(selector, 0);
});

async function scrap() {
  let browser = null;
  if (useBrowserRender) browser = await puppeteer.launch({ headless: false });
  for (let i = 0; i < sites.length; i++) {
    try {
      let html = null;
      if (useBrowserRender) {
        const page = await browser.newPage();
        await page.goto(`${sites[i]}${resourcePath}`);
        html = await page.content();
      } else {
        const page = await fetch(`${sites[i]}${resourcePath}`);
        html = await page.text();
      }
      const $ = cheerio.load(html);
      for (const selector of selectors) {
        if ($(selector).length == 1) {
          sitesMap.get(sites[i]).push(selector);
          selectorsMap.set(selector, selectorsMap.get(selector) + 1);
        }
      }
      console.clear();
      console.log(
        `Matching selectors (${Math.round(
          (i * 100) / sites.length
        )}% completed)\n`
      );
      console.log(selectorsMap);
    } catch (error) {
      if (useBrowserRender) {
        sitesMap.get(sites[i]).push(error);
      }
    }
  }
  if (browser) await browser.close();
  console.clear();
  console.log(sitesMap);
  console.log(selectorsMap);
}

scrap();

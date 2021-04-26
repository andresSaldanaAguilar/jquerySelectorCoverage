import fetch from "node-fetch";
import cheerio from "cheerio";
const sites = require("../inputs/sites.json");
const selectors = require("../inputs/selectors.json");
const { resourcePath } = require("../inputs/configs.json");

let selectorsMap = new Map();
let sitesMap = new Map();
sites.map((site: string) => {
  sitesMap.set(site, []);
});
selectors.map((selector: string) => {
  selectorsMap.set(selector, 0);
});

export const scrap = async () => {
  for (let i = 0; i < sites.length; i++) {
    try {
      let html = null;

      const page = await fetch(`${sites[i]}${resourcePath}`);
      html = await page.text();
      const $ = cheerio.load(html);
      for (const selector of selectors) {
        if ($(selector).length >= 1) {
          sitesMap.get(sites[i]).push(`${selector} (${$(selector).length})`);
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
      sitesMap.get(sites[i]).push(error);
    }
  }
  console.clear();
  console.log(sitesMap);
  console.log(selectorsMap);
};

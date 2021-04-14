import fetch from "node-fetch";
import cheerioModule = require("cheerio");
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
    selectorsMap.set(selector, []);
});

async function scrap() {
    let browser = null;
    let found = false;
    let sitesNotFound = [];
    if (useBrowserRender) browser = await puppeteer.launch({ headless: false });
    for (let i = 0; i < sites.length; i++) {
        // console.log(sites[i]);
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
            const $ = cheerioModule.load(html);
            for (const selector of selectors) {
                // console.log($.root().find('u'));
                if ($(selector).length >= 1 && found === false) {
                    found = true;
                    sitesMap.get(sites[i]).push(`${selector} (${$(selector).length})`);
                    selectorsMap.get(selector).push(`$(${sites[i]})`);
                    // selectorsMap.set(selector, selectorsMap.get(selector) + 1);
                }
            }
            
            if (found === false) {
                console.log(found, sites[i])
                sitesNotFound.push(sites[i]);
            }
            found = false;

            //   console.clear();
            //   console.log(
            //     `Matching selectors (${Math.round(
            //       (i * 100) / sites.length
            //     )}% completed)\n`
            //   );
            //   console.log(selectorsMap);
        } catch (error) {
            if (useBrowserRender) {
                sitesMap.get(sites[i]).push(error);
            }
        }
    }
    console.clear();
    selectorsMap.forEach(function (value, key) {
        console.log(key, value.length, value); 
    });
    console.log('sites not found',sitesNotFound);
    if (browser) await browser.close();
    //   console.clear();
    //   console.log(sitesMap);
    //   console.log(selectorsMap);
}

scrap();

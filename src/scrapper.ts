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
    if (useBrowserRender) browser = await puppeteer.launch({ headless: true });
    let count = 0;
    let notFoundCount = 0;
    let foundCount =0;
    console.log(sites.length);
    for (let i = 0; i < sites.length; i++) {
        console.log(count, sites[i]);
        count += 1;
        try {
            let html = null;
            if (useBrowserRender) {
                const page = await browser.newPage();
                await page.goto(`${sites[i]}${resourcePath}`);
                html = await page.content();
            } else {
                try{
                    const page = await fetch(`${sites[i]}${resourcePath}`);
                    html = await page.text();
                }catch (error){
                    console.log(error);
                }
            }
            const $ = cheerioModule.load(html);
            for (const selector of selectors) {
                if ($(selector).length >= 1 && found === false) {
                    found = true;
                    sitesMap.get(sites[i]).push(`${selector} (${$(selector).length})`);
                    selectorsMap.get(selector).push(`$(${sites[i]})`);
                    foundCount+=1;
                    console.log('true');
                }
            }
            
            if (found === false) {
                // console.log(found, sites[i])
                sitesNotFound.push(sites[i]);
                notFoundCount +=1;
                console.log('false');
            }
            // console.log(found, sites[i], i);
            found = false;
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
    console.log('sites not found',sitesNotFound.length, sitesNotFound);
    console.log(count, notFoundCount, foundCount);
    if (browser) await browser.close();
    //   console.clear();
    //   console.log(sitesMap);
    //   console.log(selectorsMap);
    console.log('done');
}

scrap();

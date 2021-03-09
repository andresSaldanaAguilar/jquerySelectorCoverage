import fetch from 'node-fetch';
import cheerio from 'cheerio';
const sites = require("../inputs/sites.json");
const selectors = require("../inputs/selectors.json");
const paths = require("../inputs/path.json");

let selectorsMap = new Map();
let sitesMap = new Map();
sites.map((site: string) => {sitesMap.set(site, [])})
selectors.map((selector: string) => {selectorsMap.set(selector, 0)})

async function scrap() {
    for(let i = 0; i < sites.length ; i++) {
        try {
            const response = await fetch(`${sites[i]}${paths.uri}`);
            const html = await response.text();
            const $ = cheerio.load(html);
            for(const selector of selectors){
                if($(selector).length == 1) {
                    sitesMap.get(sites[i]).push(selector);
                    selectorsMap.set(selector, selectorsMap.get(selector)+1);
                }
            }
            console.clear();
            console.log(`Matching selectors (${Math.round((i*100)/(sites.length))}% completed)\n`);
            console.log(selectorsMap);
          } catch (error) {
            sitesMap.get(sites[i]).push(error);
        }
    }
    console.clear();
    console.log(sitesMap);
    console.log(selectorsMap);
}

scrap();
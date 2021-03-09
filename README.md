# JquerySelectorCoverage
This tool helps to know which and how much sites html elements are reached given some selectors


# Requirements
  Node 12.x or higher

# Installation

  Run `npm install` on the root of the project
  
# Setup

  
  1. Add to [/inputs/sites.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/sites.json) file the sites you want to test.
  2. Add to [/inputs/selectors.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/sites.json) file the JQuery selectors you want to test on those sites.
  3. Add to [/inputs/path.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/sites.json) file if there is a specific path you want to reach on all sites.
  4. Run `node src/scrapper.js` to start collecting the results :sparkles

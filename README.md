# JquerySelectorCoverage
This tool helps to know which and how much sites html elements are reached given some selectors


# Requirements
  Node 12.x or higher

# Installation

  Run `npm install` on the root of the project
  
# Setup
  
  1. Add to [/inputs/sites.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/sites.json) file the sites you want to test.
  2. Add to [/inputs/selectors.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/selectors.json) file the JQuery selectors you want to test on those sites.
  3. Add to [/inputs/configs.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/configs.json) file if there is a specific path you want to reach on all sites, if browser render is needed (slows down the process but useful when getting 403 error codes or JS code) and if you need the browser to be headless or not.

# Run

  Run `npm install` to start collecting the results :sparkles:

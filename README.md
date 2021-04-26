# JquerySelectorCoverage
This tool helps to know which and how much sites html elements are reached given some selectors


# Requirements
  Node 12.x or higher

# Installation

  Run `npm install` on the root of the project
  
# Setup
  
  1. Add to [/inputs/sites.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/sites.json) file the sites you want to test.
  2. Add to [/inputs/selectors.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/selectors.json) file the JQuery selectors you want to test on those sites.
  3. Edit the [/inputs/configs.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs/configs.json) file to configurate the following:
```json
{
  "resourcePath": "",
  "useBrowserRender": true,
  "headlessBrowser": false
}
```
  - `resourcePath` : A specific path you want to reach on all sites
  - `useBrowserRender` : If browser render is needed (slows down the process but useful when getting 403 error codes or JS code) 
  - `headlessBrowser` : If you need the browser to be headless or not.

# Run

  Run `npm start` to start collecting scraping :sparkles:

# Debug

  Debug can be done on `VSCode` IDE and you just need to go to the debug window and hit debug

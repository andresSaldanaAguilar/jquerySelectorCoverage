# JquerySelectorCoverage
This tool helps to know which and how much sites html elements are reached given some selectors


# Requirements
  Node 12.x or higher

# Installation

  Run `npm install` on the root of the project
  
# Setup
  
  1. Create a copy of the [/inputs_example](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs_example) at the root of the project and rename it `inputs`.
  2. Add to [/inputs/sites.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs_example/sites.json) file the sites you want to test.
  3. Add to [/inputs/selectors.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs_example/selectors.json) file the JQuery selectors you want to test on those sites.
  4. Edit the [/inputs/configs.json](https://github.com/andresSaldanaAguilar/jquerySelectorCoverage/blob/master/inputs_example/configs.json) file to configurate the following:
```json
{
  "resourcePath": "",
  "useBrowserRender": false,
  "headlessBrowser": false,
  "linkToCrawl": null
}
```
  - `resourcePath` : A specific path you want to reach on all sites, useful to hit listing pages.
  - `useBrowserRender` : If browser render is needed (slows down the process but useful when getting 403 error codes or executing JS code).
  - `headlessBrowser` : If you need the browser to be headless or not for the `useBrowserRender` option.
  - `linkToCrawl` : 
    - JQuery selector for an element to click on all sites, will crawl the redirected site(s).
    - Will do the normal process with the crawled links.
    - If `null`, will skip all this step.

# Run

  Run `npm start` to create the coverage report

# Debug

  Debug can be done on `VSCode` IDE and you just need to go to the debug window and hit debug

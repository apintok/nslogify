# nslogify

A Mozilla Firefox browser extension that pretty prints SuiteScript Logs in NetSuite ERP Software. It displays Arrays & Objects logs in a humand readable way. This extension was built using Javascript & CSS. I personally use Mozilla Firefox to work with NetSuite and I think the SuiteScript logs can be better presented. So I decided to create this extension.
## Details

- 🌍 Available for Firefox!
- 📌 The goal is to format SuiteScript Logs that are either Arrays or Objects.
- :package: The extension is built using Parcel Bundler.
- 🚧 Working still to have it published for any one who wants to use it. There are a lot of things to consider and I am trying to make sure the first version at least works.
- 👽 Open for help while developing. Just let me know if you want to.
## Local Installation

To install this web extension locally for Firefox, *__only__* the following file structure is needed in order for it to work:

```bash
    nslogify/
        content_scripts/
            nslogify.js
        css/
            style.css
        icons/
            code-48.png
            code-96.png
        manifest.json
        README.md
```

After download the respective file structure. On Firefox open the [about:debugging](about:debugging#/runtime/this-firefox) page and load the extension manifest.json file.
## Statistics

[![file size](https://img.shields.io/github/directory-file-count/apintok/nslogify)]()
[![last commit](https://img.shields.io/github/last-commit/apintok/nslogify)]()
[![current version](https://img.shields.io/github/manifest-json/v/apintok/nslogify)]()
[![mit license](https://img.shields.io/github/license/apintok/nslogify)]()
[![lang count](https://img.shields.io/github/languages/count/apintok/nslogify)]()

[![downloads](https://img.shields.io/amo/dw/nslogify)]()
[![users](https://img.shields.io/amo/users/nslogify)]()

## Social

[![forks](https://img.shields.io/github/forks/apintok/nslogify?style=social)]()
[![stars](https://img.shields.io/github/stars/apintok/nslogify?style=social)]()

## Appendix/Add-on Submission

- Operating system used for the build? 
    - **Windows**
- Details of any specific versions of tools or utilities needed? 
    - **parcel-bundler**
- Links to any tools or utilities that need to be downloaded?
    - [**Parcel**](https://parceljs.org)
- Guidance for installing any downloaded tools and utilities, for example, links to online instructions? 
    - [**npm Parcel**](https://www.npmjs.com/package/parcel)
- Instructions for building your add-on code or details of any scripts provided?
- The build script?
    - **"parcel build ./js/app.js --dist-dir ./content_scripts/ --public-url ."**
- The version lockfile for any package management tools, such as npm or yarn?
    - [**package-lock.json**](https://github.com/apintok/nslogify/blob/main/package-lock.json)
- Anything else needed to complete the build of your extension’s package?
    - **N/A**

## Reference / Related
The extension that solves this problem already exists for Google Chrome. [See it here](https://chrome.google.com/webstore/detail/netsuite-html-script-note/lipldhgjkmfhamocfcdijcdgjcikcbkk). As it was never made available for Firefox I decided to create one for it.

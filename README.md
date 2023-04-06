# nslogify

A Mozilla Firefox browser extension that pretty prints SuiteScript Logs in NetSuite ERP Software. It displays Arrays & Objects logs in a humand readable way. This extension was built using Javascript & CSS. I personally use Mozilla Firefox to work with NetSuite and I think the SuiteScript logs can be better presented. So I decided to create this extension.
## Details

- 🌍 Available for Firefox!
- 📌 The goal is to format SuiteScript Logs that are either Arrays or Objects.
- :package: The extension is built using Parcel Bundler.
- 🚧 Working still to have it published for any one who wants to use it. There are a lot of things to consider and I am trying to make sure the first version at least works.
- 👽 Open for help while developing. Just let me know if you want to.
## Deploy

To install this web extension in Firefox locally, *__only__* the following file structure is needed in order for it to work:

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

## Change

Parcel is being used to generate an extension bundle. After changing something in the code don't forget to run the command to redo the bundle and navigate to Firefox add-ons area and press 'reload' to reflect the changes.

```bash
    npm run dev
```

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


## Reference / Related
The extension that solves this problem already exists for Google Chrome. [See it here](https://chrome.google.com/webstore/detail/netsuite-html-script-note/lipldhgjkmfhamocfcdijcdgjcikcbkk). As it was never made available for Firefox I decided to create one for it.

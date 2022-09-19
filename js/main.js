import { getLogs, extractLogs, parseLog, printLogs } from '../js/util';

console.log('Extension', 'Init...');

// ? DOM ELEMENTS
const executionLogTab = document.getElementById('executionloglnk');
const refreshBtn = document.getElementById('refreshscriptnote');

var cssFile = document.createElement('link');
cssFile.setAttribute('rel', 'stylesheet');
cssFile.setAttribute('type', 'text/css');
cssFile.setAttribute(
    'href',
    'resource://02a75d05ec7a8e9f06a94cfac394797f3e7e4775@temporary-addon/content/skin/main.css'
);
document.getElementsByTagName('head')[0].appendChild(cssFile);

class Log {
    constructor(value) {
        this.value = value;
    }

    isArray() {
        return Array.isArray(this.value);
    }

    isEmptyArray() {
        return this.value.length === 0 && this.isArray();
    }

    isObject() {
        return (
            typeof this.value === 'object' &&
            this.value !== null &&
            !this.isArray(this.value)
        );
    }

    isEmptyObject() {
        return this.isObject() && Object.keys(this.value).length === 0;
    }

    buildHTML() {
        const logDiv = document.createElement('div');
        const logPre = document.createElement('pre');
        const logCode = document.createElement('code');
        logDiv.setAttribute('class', 'log__dark');
        logDiv.appendChild(logPre);
        logPre.appendChild(logCode);
        return logDiv;
    }
}

executionLogTab.addEventListener('click', function () {
    init();
});

refreshBtn.addEventListener('click', function () {
    init();
});

function init() {
    const logRows = getLogs();
    const extractedLogs = extractLogs(logRows);
    const parsedLogs = parseLog(extractedLogs);
    let logsArray = [];

    for (let i = 0; i < parsedLogs.length; i++) {
        // console.log(`parsedLog ${i} >>>`, parsedLogs[i]);
        logsArray.push(new Log(parsedLogs[i]));
    }
    console.log('logsArray', logsArray);

    printLogs(parsedLogs);
}

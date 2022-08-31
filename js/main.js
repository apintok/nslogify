import { getLogs, extractLogs, parseLog } from '../js/util';

console.log('Extension', 'Init...');

// ? DOM ELEMENTS
const executionLogTab = document.getElementById('executionloglnk');
const refreshBtn = document.getElementById('refreshscriptnote');

var cssFile = document.createElement('link');
cssFile.setAttribute('rel', 'stylesheet');
cssFile.setAttribute('type', 'text/css');
cssFile.setAttribute(
    'href',
    'resource://02a75d05ec7a8e9f06a94cfac394797f3e7e4775@temporary-addon/content/skin/style.css'
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
    let arr = [];

    for (let i = 0; i < parsedLogs.length; i++) {
        console.log(`parsedLog ${i} >>>`, parsedLogs[i]);
        arr.push(new Log(parsedLogs[i]));
    }
}

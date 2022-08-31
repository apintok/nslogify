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
    constructor(type) {
        this.type = type;
    }

    get isArray() {
        return Array.isArray(this.type);
    }
}

executionLogTab.addEventListener('click', function () {
    const logRows = getLogs();
    const extractedLogs = extractLogs(logRows);
    const parsedLogs = parseLog(extractedLogs);

    for (let i = 0; i < parsedLogs.length; i++) {
        console.log(`parsedLog ${i} >>>`, parsedLogs[i]);
    }
});

refreshBtn.addEventListener('click', function () {
    const logRows = getLogs();
    const extractedLogs = extractLogs(logRows);
    const parsedLogs = parseLog(extractedLogs);

    for (let i = 0; i < parsedLogs.length; i++) {
        console.log(`parsedLog ${i} >>>`, parsedLogs[i]);
    }
});

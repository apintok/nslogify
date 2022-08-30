import { getLogs } from '/js/util';

console.log('Extension', 'Init...');

// ? DOM ELEMENTS
const executionLogTab = document.getElementById('executionloglnk');
const refreshBtn = document.getElementById('refreshscriptnote');

var fileref = document.createElement('link');
fileref.setAttribute('rel', 'stylesheet');
fileref.setAttribute('type', 'text/css');
fileref.setAttribute(
    'href',
    'resource://02a75d05ec7a8e9f06a94cfac394797f3e7e4775@temporary-addon/content/skin/style.css'
);
document.getElementsByTagName('head')[0].appendChild(fileref);

executionLogTab.addEventListener('click', function () {
    getLogs();
});

refreshBtn.addEventListener('click', function () {
    getLogs();
});

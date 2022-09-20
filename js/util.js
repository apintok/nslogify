'use strict';

export const getLogs = () => {
    let logs = null;
    const scriptNotes = document.getElementById('scriptnote__tab');
    // ! tBody is the table containing the logs!
    const tBody = scriptNotes.children[1];
    logs = tBody.childNodes;
    console.log('LOGS INIT >>> ', logs);

    if (!logs) {
        getLogs();
        return;
    }
    return logs;
};

export const extractLogs = (logRows) => {
    const detailsCol = 7;
    let validLogs = [];
    let colValue;
    let colHTML;

    for (let i = 0; i < logRows.length / 2; i++) {
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;
        colValue = columns.item(detailsCol).innerText;
        colHTML = columns.item(detailsCol).innerHTML;

        validLogs.push(colValue);
    }

    return validLogs;
};

export const parseLog = (logs) => {
    let parsedLogs = [];
    logs.forEach((log) => parsedLogs.push(logType(log)));
    return parsedLogs;
};

const logType = (log) => {
    const maxColLength = 3999;
    const arr = '[';
    const obj = '{';

    if (log.length < maxColLength) {
        if (log[0] === arr || log[0] === obj) return JSON.parse(log);
    }
};

export const printLogs = (parsedLogs) => {
    const detailsCol = 7;

    for (let i = 0; i < parsedLogs.length; i++) {
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;

        // console.log(`PARSED LOG >>> ${i} `, parsedLogs[i]);
        if (parsedLogs[i] && Object.keys(parsedLogs[i]).length > 0) {
            let pre = document.createElement('pre');
            let code = document.createElement('code');

            code.innerHTML = prettyPrintLogs(parsedLogs[i]);

            if (columns[detailsCol].firstElementChild) {
                columns[detailsCol].removeChild(pre.firstElementChild);
            }

            pre.append(code);
            columns[detailsCol].firstChild.textContent = '';
            columns[detailsCol].append(pre);
        }
    }
};

const prettyPrintLogs = (obj) => {
    const keysHTML = buildKeysHTML(obj);
    const valuesHTML = buildValuesHTML(obj);
    return buildCodeHTML(keysHTML, valuesHTML);
};

const buildKeysHTML = (obj) => {
    // console.log(`buildKeysHTML >>> `, obj);
    let keysArr = [];

    for (const key in obj) {
        keysArr.push(`<span class="key">"${key}"</span>`);
    }

    return keysArr;
};

const buildValuesHTML = (obj) => {
    const cssClassString = 'value__str';
    const cssClassBoolean = 'value__bool';
    const cssClassNumber = 'value__num';
    const cssClassNull = 'value__null';
    const cssClassUrl = 'value__url';
    const cssClassObj = 'value__obj';
    const cssClassArr = 'value__arr';

    // console.log(`buildValuesHTML >>> `, obj);
    let valuesArr = [];

    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            valuesArr.push(
                `<span class="${cssClassString}">"${obj[key]}"</span>`
            );
        } else if (typeof obj[key] === 'number') {
            valuesArr.push(
                `<span class="${cssClassNumber}">${obj[key]}</span>`
            );
        } else if (typeof obj[key] === 'boolean') {
            valuesArr.push(
                `<span class="${cssClassBoolean}">${obj[key]}</span>`
            );
        } else if (obj[key] === null) {
            valuesArr.push(`<span class="${cssClassNull}">${obj[key]}</span>`);
        } else if (typeof obj[key] === 'object') {
            console.log('Is Object?', true);
            // TODO: If obj stringify to see if is arr/obj
            const myObj = JSON.stringify(obj[key]);

            if (myObj[0] === '{') {
                console.log('Is Object!', true);
            } else {
                console.log('Is Array!', true);
            }

            const rootObj = JSON.stringify(obj[key]);
            console.log('rootObj', rootObj);
            valuesArr.push(`<span class="${cssClassObj}">${obj[key]}</span>`);
        }
    }

    return valuesArr;
};

const buildCodeHTML = (keysHTML, valuesHTML) => {
    const openBracket = '{';
    const closeBracket = '}';

    let finalPrint = '';

    for (let i = 0; i < keysHTML.length; i++) {
        finalPrint += `${keysHTML[i]}: ${valuesHTML[i]},<br>`;
    }
    // console.log('buildCodeHTML/finalPrint >>> ', finalPrint);
    return `${openBracket}<br>${finalPrint.substring(
        0,
        finalPrint.length - 5
    )}<br>${closeBracket}`;
};

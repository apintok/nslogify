'use strict';

export const getLogs = () => {
    let logs = null;
    const scriptNotes = document.getElementById('scriptnote__tab');
    // ! tBody is the table containing the logs!
    const tBody = scriptNotes.children[1];
    logs = tBody.childNodes;
    // console.log('LOGS INIT >>> ', logs);

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

    console.log('validLogs >>> ', validLogs);
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
    let colHTML;
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    pre.setAttribute('class', 'log__dark');

    for (let i = 0; i < parsedLogs.length; i++) {
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;
        colHTML = columns.item(detailsCol).innerHTML;
        // console.log(`LOG-ROW >>> ${i} `, row);
        // console.log(`LOG-COLUMNS ${detailsCol}, Row ${i} >>> `, columns);

        if (parsedLogs[i]) {
            // console.log(`PARSED LOG >>> ${i} `, parsedLogs[i]);
            // console.log(`LOG-COLUMNS ${detailsCol}, >>> `, columns[detailsCol]);
            // code.innerHTML = prettyPrintLogs(parsedLogs[i]);
            // pre.append(code);
            // columns[detailsCol].innerHTML = pre.outerHTML;
        }
    }
};

const prettyPrintLogs = (parsedLog) => {
    // `<span class="key">"firstname":</span> <span class="value__dflt">"Andre"</span>`;
    const openBracket = '{';
    const closeBracket = '}';
    let finalPrint = '';

    for (const property in parsedLog) {
        console.log(`${property}: ${parsedLog[property]}`);
        finalPrint +=
            `<span class="key">"${property}"</span>` +
            `:` +
            `<span class="value__dflt">${parsedLog[property]}</span>`;
    }

    console.log(`finalPrint >>>`, `${finalPrint}`);

    return openBracket + finalPrint + closeBracket;
};

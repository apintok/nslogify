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
    let colvalue;

    for (let i = 0; i < logRows.length / 2; i++) {
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;
        colvalue = columns.item(detailsCol).innerText;
        // console.log(`LOG-ROW >>> ${i} `, row);
        // console.log(`LOG-colvalue >>> ${i} `, colvalue);
        // console.log(`LOG-COLUMNS-LENGTH >>> ${i} `, colvalue.length);

        validLogs.push(colvalue);
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

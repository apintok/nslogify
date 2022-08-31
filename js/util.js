// util library

export const getLogs = () => {
    setTimeout(() => {
        const scriptNotes = document.getElementById('scriptnote__tab');
        // ! tBody is the table containing the logs!
        const tBody = scriptNotes.children[1];
        const logs = tBody.childNodes;

        formatLogs(logs);
    }, 600);
};

const formatLogs = (logs) => {
    const titleCol = 3;
    const detailsCol = 7;
    const colMaxLength = 3999;
    console.log('LOGS >>> ', logs);
    // console.log('LOGS TYPEOF >>> ', typeof logs);
    // console.log('LOGS.LENGTH', logs.length);

    for (let i = 0; i <= logs.length / 2; i++) {
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;
        let colvalue = columns.item(detailsCol).innerText;
        // console.log(`LOG-ROW >>> ${i} `, row);
        console.log(`LOG-COLUMNS-LENGTH >>> ${i} `, colvalue.length);
        // console.log(`LOG-COLUMNS TYPEOF >>> ${i} `, typeof colvalue);

        if (colvalue.length < colMaxLength) {
            let log = validateLogType(colvalue);
            // console.log(`LOG-PARSED >>> ${i} `, log);
            // console.log(`LOG-PARSED TYPEOF >>> ${i} `, typeof log);
            if (log) {
                let prettyLog = JSON.stringify(log, null, 4);
                console.log(
                    `LOG-colvalue >>> ${i} `,
                    columns[detailsCol].innerHTML
                );
                columns[detailsCol].innerHTML =
                    '<div class="background-night"><pre><code>' +
                    prettyLog +
                    '</pre></code></div>';
            }
        } else {
            console.warn('Object is too long!');
        }
    }
};

const validateLogType = (log) => {
    const arr = '[';
    const obj = '{';

    if (log[0] === arr || log[0] === obj) return JSON.parse(log);
};

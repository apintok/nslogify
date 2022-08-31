const $a2c9477ca016f6ca$export$cb5260c832aab30a = ()=>{
    setTimeout(()=>{
        const scriptNotes = document.getElementById("scriptnote__tab");
        // ! tBody is the table containing the logs!
        const tBody = scriptNotes.children[1];
        const logs = tBody.childNodes;
        $a2c9477ca016f6ca$var$formatLogs(logs);
    }, 600);
};
const $a2c9477ca016f6ca$var$formatLogs = (logs)=>{
    const titleCol = 3;
    const detailsCol = 7;
    const colMaxLength = 3999;
    console.log("LOGS >>> ", logs);
    // console.log('LOGS TYPEOF >>> ', typeof logs);
    // console.log('LOGS.LENGTH', logs.length);
    for(let i = 0; i <= logs.length / 2; i++){
        let row = document.getElementById(`scriptnoterow${i}`);
        let columns = row.children;
        let colvalue = columns.item(detailsCol).innerText;
        // console.log(`LOG-ROW >>> ${i} `, row);
        console.log(`LOG-COLUMNS-LENGTH >>> ${i} `, colvalue.length);
        // console.log(`LOG-COLUMNS TYPEOF >>> ${i} `, typeof colvalue);
        if (colvalue.length < colMaxLength) {
            let log = $a2c9477ca016f6ca$var$validateLogType(colvalue);
            // console.log(`LOG-PARSED >>> ${i} `, log);
            // console.log(`LOG-PARSED TYPEOF >>> ${i} `, typeof log);
            if (log) {
                let prettyLog = JSON.stringify(log, null, 4);
                console.log(`LOG-colvalue >>> ${i} `, columns[detailsCol].innerHTML);
                columns[detailsCol].innerHTML = '<div class="background-night"><pre><code>' + prettyLog + "</pre></code></div>";
            }
        } else console.warn("Object is too long!");
    }
};
const $a2c9477ca016f6ca$var$validateLogType = (log)=>{
    const arr = "[";
    const obj = "{";
    if (log[0] === arr || log[0] === obj) return JSON.parse(log);
};


console.log("Extension", "Init...");
// ? DOM ELEMENTS
const $9184024f63534557$var$executionLogTab = document.getElementById("executionloglnk");
const $9184024f63534557$var$refreshBtn = document.getElementById("refreshscriptnote");
var $9184024f63534557$var$fileref = document.createElement("link");
$9184024f63534557$var$fileref.setAttribute("rel", "stylesheet");
$9184024f63534557$var$fileref.setAttribute("type", "text/css");
$9184024f63534557$var$fileref.setAttribute("href", "resource://02a75d05ec7a8e9f06a94cfac394797f3e7e4775@temporary-addon/content/skin/style.css");
document.getElementsByTagName("head")[0].appendChild($9184024f63534557$var$fileref);
$9184024f63534557$var$executionLogTab.addEventListener("click", function() {
    (0, $a2c9477ca016f6ca$export$cb5260c832aab30a)();
});
$9184024f63534557$var$refreshBtn.addEventListener("click", function() {
    (0, $a2c9477ca016f6ca$export$cb5260c832aab30a)();
});


//# sourceMappingURL=nslogify.js.map

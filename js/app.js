console.log('Extension Init...');

// UI ELEMENTS
const scriptNotes = document.getElementById('scriptnote__div');

// Create a new observer object for the Execution Logs Tab in the UI.
const executionLogsUI = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'childList' &&
      mutation.target.id === 'scriptnote__div'
    ) {
      // console.log(mutation.type, mutation.target);
      const scriptNotesTable = mutation.target.firstElementChild;
      const scriptNotesTableBody = scriptNotesTable.lastChild;
      // console.log('scriptNotesTableBody >>> ', scriptNotesTableBody);
      const scriptNotesTableLines = scriptNotesTableBody.childNodes;
      // console.log('scriptNotesTableLines >>> ', scriptNotesTableLines);

      // ! 2nd GOAL achieved. Reach the Details Column for each line in the logs table
      // * Loop thorugh each table line
      for (let i = 0; i < scriptNotesTableLines.length; i++) {
        if (i % 2 !== 0) {
          continue;
        }

        const columns = scriptNotesTableLines[i].children;

        // * Loop thorugh each line column
        for (const key in columns) {
          if (Object.hasOwnProperty.call(columns, key)) {
            if (key === '7') {
              // * The Details Column index is 7.
              const detailsColumn = columns['7'];

              // ! return the log parsed!
              const formattedLog = formatLog(detailsColumn.textContent);
              // console.log('Inner HTML >>> ', detailsColumn);

              const divElement = document.createElement('div');
              const preElement = document.createElement('pre');
              const codeElement = document.createElement('code');

              divElement.classList.add('log__dark');
              divElement.appendChild(preElement);
              preElement.appendChild(codeElement);

              if (formattedLog !== 'ignore') {
                codeElement.textContent = JSON.stringify(formattedLog, null, 2);
                // Append the div element to the td element
                detailsColumn.replaceChild(
                  divElement,
                  detailsColumn.firstChild
                );
              }
            }
          }
        }
      }
    }
  });
});

// Start observing the document's body element and all its descendants
executionLogsUI.observe(scriptNotes, {
  childList: true, // detect when child nodes are added or removed
  attributes: true, // detect when attributes of existing nodes are changed
  subtree: true // observe all descendants of the target node
});

// FUNCTIONS
const formatLog = (log) => {
  if (!log) return;

  const parsedLog = JSON.parse(log);
  let formattedLog = 'ignore';
  console.log('Log >>> ', log);

  if (Array.isArray(parsedLog) || typeof parsedLog === 'object') {
    console.log('The contents of the log represent an ARRAY/OBJECT.');
    formattedLog = parsedLog;
  }

  return formattedLog;
};

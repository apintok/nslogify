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
        // console.log('Columns >>> ', columns);

        // * Loop thorugh each line column
        for (const key in columns) {
          if (Object.hasOwnProperty.call(columns, key)) {
            if (key === '7') {
              // * The Details Column index is 7.
              const detailsColumn = columns['7'];
              // console.log('detailsColumn >>> ', detailsColumn);
              console.log('Column Text/Value >>> ', detailsColumn.textContent);
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
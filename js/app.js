console.log('Extension Init...');

// UI ELEMENTS
const scriptNotes = document.getElementById('scriptnote__div');

// EVENT LISTENERS
// Create a new observer object for the Execution Logs Tab in the UI.
const executionLogsUI = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'childList' &&
      mutation.target.id === 'scriptnote__div'
    ) {
      console.log(mutation.type, mutation.target);
      const scriptNotesTable = mutation.target.firstElementChild;
      const scriptNotesTableBody = scriptNotesTable.lastChild;
      const tableLinesCount = scriptNotesTableBody.childElementCount;
      console.log('count >>> ', tableLinesCount);
      console.log('scriptNotesTableBody >>> ', scriptNotesTableBody);
      const scriptNotesTableLines = scriptNotesTableBody.childNodes;
      console.log('scriptNotesTableLines >>> ', scriptNotesTableLines);

      // ! First GOAL achieved. Reach the div.table.lines of the script execution logs table
      for (let i = 0; i < scriptNotesTableLines.length; i++) {
        if (i % 2 !== 0) {
          continue;
        }
        console.log(scriptNotesTableLines[i]);
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

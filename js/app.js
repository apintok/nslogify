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

              const container = document.createElement('div');
              const top = document.createElement('div');
              const btn = document.createElement('button');
              const display = document.createElement('div');
              const preElement = document.createElement('pre');
              const codeElement = document.createElement('code');

              container.classList.add('log', 'dark');
              top.classList.add('top');
              container.appendChild(top);
              btn.id = 'copy';
              btn.textContent = 'Copy Code';
              top.appendChild(btn);
              display.classList.add('display');
              container.appendChild(display);
              display.appendChild(preElement);
              codeElement.id = 'code';
              preElement.appendChild(codeElement);

              if (formattedLog !== 'ignore') {
                // codeElement.textContent = JSON.stringify(formattedLog, null, 2);
                codeElement.innerHTML = formattedLog;
                // Append the div element to the td element
                detailsColumn.replaceChild(container, detailsColumn.firstChild);
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

  if (Array.isArray(parsedLog)) {
    formattedLog = formatArray(parsedLog);
  } else if (typeof parsedLog === 'object') {
    formattedLog = parsedLog;
  }

  return formattedLog;
};

const formatArray = (parsedLog) => {
  let htmlLog = '';

  parsedLog.forEach((value) => {
    if (typeof value === 'string') {
      htmlLog += `<span class="value__str">"${value}"</span>,\n`;
    } else if (typeof value === 'number') {
      htmlLog += `<span class="value__num">${value}</span>,\n`;
    } else if (typeof value === 'boolean') {
      htmlLog += `<span class="value__bool">${value}</span>,\n`;
    } else if (value === null) {
      htmlLog += `<span class="value__null">${value}</span>,\n`;
    } else if (typeof value === 'undefined') {
      htmlLog += `<span class="value__null">${value}</span>,\n`;
    }
  });

  htmlLog = htmlLog.slice(0, -2);
  console.log('formatArray >>> ', htmlLog);
  return `[\n${htmlLog}\n]`;
};

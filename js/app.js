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
      const scriptNotesTable = mutation.target.firstElementChild;
      const scriptNotesTableBody = scriptNotesTable.lastChild;
      const scriptNotesTableLines = scriptNotesTableBody.childNodes;
      const detailsColumnIndex = '7';

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
            if (key === detailsColumnIndex) {
              const detailsColumn = columns[detailsColumnIndex];

              // ! return the log parsed!
              const formattedLog = formatLog(detailsColumn.textContent);
              // console.log('Inner HTML >>> ', detailsColumn);

              // TODO: move html elements creation to a function
              // TODO: create a formatObject function
              // TODO: get svg for clipboard for the button
              // TODO: button functionality

              const htmlElements = buildHTML();

              if (formattedLog !== 'ignore') {
                // codeElement.textContent = JSON.stringify(formattedLog, null, 2);
                htmlElements.code.innerHTML = formattedLog;
                // Append the div element to the td element
                detailsColumn.replaceChild(
                  htmlElements.container,
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

const formatObject = (parsedLog) => {};

const createSVG = (elementToAppend) => {
  // Create an SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute(
    'd',
    'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'
  );

  svg.appendChild(path);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  rect.setAttribute('x', '8');
  rect.setAttribute('y', '2');
  rect.setAttribute('width', '8');
  rect.setAttribute('height', '4');
  rect.setAttribute('rx', '1');
  rect.setAttribute('ry', '1');

  svg.appendChild(rect);

  elementToAppend.appendChild(svg);
};

const buildHTML = () => {
  // * HTML ELEMENTS
  const container = document.createElement('div');
  const top = document.createElement('div');
  const btn = document.createElement('button');
  const display = document.createElement('div');
  const pre = document.createElement('pre');
  const code = document.createElement('code');

  container.classList.add('log', 'dark');
  top.classList.add('top');
  container.appendChild(top);
  btn.id = 'copy';
  createSVG(top);
  btn.textContent = 'Copy Code';
  top.appendChild(btn);
  display.classList.add('display');
  container.appendChild(display);
  display.appendChild(pre);
  code.id = 'code';
  pre.appendChild(code);

  return {
    container,
    code
  };
};

// UI ELEMENTS
const scriptNotes = document.getElementById('scriptnote__div');

// Create a new observer object for the Execution Logs Tab in the UI.
const executionLogsUI = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'childList' &&
      mutation.target.id === scriptNotes.id
    ) {
      const scriptNotesTable = mutation.target.firstElementChild;
      const scriptNotesTableBody = scriptNotesTable.lastChild;
      const scriptNotesTableLines = scriptNotesTableBody.childNodes;
      const detailsColumnIndex = '7';

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
              const formattedLog = formatLog(detailsColumn.textContent);
              const htmlElements = buildHTML();

              // ! Add the EVENT LISTENER to the button
              htmlElements.btn.style.cursor = "pointer";
              htmlElements.btn.addEventListener('click', (e) => {
                const copiedText =
                  e.target.parentElement.parentElement.lastChild.textContent;
                navigator.clipboard.writeText(copiedText);
                htmlElements.btn.textContent = 'Code copied!';

                setInterval(() => {
                  htmlElements.btn.textContent = 'Copy Code';
                }, 3000);
              });

              console.log('ignored? >>> ', formattedLog);

              if (formattedLog !== 'ignore') {
                htmlElements.pre.innerHTML = syntaxHighlight(
                  JSON.stringify(formattedLog, undefined, 2)
                );

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
  childList: true,
  attributes: true,
  subtree: true
});

// FUNCTIONS
const formatLog = (log) => {
  if (!log) return;

  try {
    return JSON.parse(log);
  } catch (e) {
    return log;
  }
};

const syntaxHighlight = (json) => {
  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cssClass = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cssClass = 'key';
        } else {
          cssClass = 'string';
        }
      } else if (/true|false/.test(match)) {
        cssClass = 'boolean';
      } else if (/null/.test(match)) {
        cssClass = 'null';
      }
      return `<span class="${cssClass}">${match}</span>`;
    }
  );
};

const createSVG = (elementToAppend) => {
  const svgAttributes = {
    'viewBox': '0 0 24 24',
    'width': '18',
    'height': '18',
    'stroke': 'currentColor',
    'fill': 'none',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  };

  const rectAttributes = {
    x: '8',
    y: '2',
    width: '8',
    height: '4',
    rx: '1',
    ry: '1'
  };

  // Create an SVG Elements
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  // Set the SVG Element Attributes
  setAttributes(svg, svgAttributes);

  path.setAttribute(
    'd',
    'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'
  );

  svg.appendChild(path);

  // Set the RECT Element Attributes
  setAttributes(rect, rectAttributes);

  svg.appendChild(rect);

  elementToAppend.appendChild(svg);
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
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
  display.classList.add('display');
  display.id = 'display';
  top.appendChild(btn);
  container.appendChild(display);
  display.appendChild(pre);
  code.id = 'code';
  // pre.appendChild(code);

  return {
    container,
    btn,
    pre
  };
};

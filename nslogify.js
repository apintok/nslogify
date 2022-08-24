console.log('extension', 'init');

// ? DOM ELEMENTS

const executionLogTab = document.getElementById('executionloglnk');
const refreshBtn = document.getElementById('refreshscriptnote');

executionLogTab.addEventListener('click', function () {
	getLogs();
});

refreshBtn.addEventListener('click', function () {
	getLogs();
});

const getLogs = () => {
	setTimeout(() => {
		const scriptNotes = document.getElementById('scriptnote__tab');
		// ! tBody is the table containing the logs!
		const tBody = scriptNotes.children[1];
		const titleCol = 3;
		const detailsCol = 7;
		const logs = tBody.childNodes;

		console.log(logs);
		console.log(logs.length);

		for (let i = 0; i < logs.length / 2; i++) {
			let row = document.getElementById(`scriptnoterow${i}`);
			let details = row.children[detailsCol].textContent;

			const detailsObj = JSON.parse(details);
			const detailsObjPrint = JSON.stringify(detailsObj, null, 4);

			row.children[detailsCol].innerHTML = '<pre><code>' + detailsObjPrint + '</pre></code>';
		}

		// logs.forEach((log) => {
		// 	let title = log.cells[titleCol].textContent;
		// 	let details = log.cells[detailsCol].textContent;

		// 	const detailsObj = JSON.parse(details);
		// 	const detailsObjPrint = JSON.stringify(detailsObj, null, 4);

		// 	log.cells[detailsCol].innerHTML = '<pre><code>' + detailsObjPrint + '</pre></code>';
		// });
	}, 600);
};

const readline = require('readline');
const fs = require('fs');

console.log("const hypernyms = {};");

const readInterface = readline.createInterface({
    input: fs.createReadStream('./hypernyms.txt'),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
	const columns = line.split(',');
	const child = columns[0];
	let parents = "[";
	for (let i = 1; i < columns.length; i++) {
		if (i === columns.length - 1) {
			parents += columns[i];
		} else {
			parents += columns[i] + ",";
		}
	}
	parents += "]";
	console.log("hypernyms[" + child + "] = " + parents + ";");
});
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
	const parent = columns[0];
	let children = "[";
	for (let i = 1; i < columns.length; i++) {
		if (i === columns.length - 1) {
			children += columns[i];
		} else {
			children += columns[i] + ",";
		}
	}
	children += "]";
	console.log("hypernyms[" + parent + "] = " + children + ";");
});
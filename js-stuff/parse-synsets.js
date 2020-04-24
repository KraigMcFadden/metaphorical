const readline = require('readline');
const fs = require('fs');

console.log("const definitionIndexMap = {};");
console.log("const definitions = [];");

const readInterface = readline.createInterface({
    input: fs.createReadStream('./synsets.txt'),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
	console.log();
	const columns = line.split(',');
	const index = columns[0];
	const words = columns[1];
	const definition = columns[2].replace(/[\""]/g, '\\"').trim();
	console.log("definitions[" + index + '] = "' + definition + '"');
	for (const word of words.split(" ")) {
		console.log('definitionIndexMap["' + word + '"] = ' + index + ";");
	}
});
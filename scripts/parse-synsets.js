const readline = require('readline');
const fs = require('fs');

console.log("const wordToIdMap = {};");
console.log("const idToWordMap = {};");
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

	let isFirst = true;
	for (const word of words.split(" ")) {
		const cleanedWord = word.toLowerCase().replace(/_/g, ' ');
		console.log('wordToIdMap["' + cleanedWord + '"] = ' + index + ";");

		const thisIdEntry = 'idToWordMap[' + index + ']';
		if (isFirst) {
			console.log(thisIdEntry + ' = ["' + cleanedWord + '"];');
		} else {
			console.log(thisIdEntry + '.push("' + cleanedWord + '");');
		}
		isFirst = false;
	}
});
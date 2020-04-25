async function reverseMap() {
	let hyponymsReverseMapped = false;
	while (!hyponymsReverseMapped) {

		// if the hypernym file has finished loading, and we haven't already done the reverse mapping, do the reverse mapping
		if (isHypernymsFinished && !hyponymsReverseMapped) {
			for (const [childId, parentIds] of Object.entries(hypernyms)) {
				for (const parentId of parentIds) {
					hyponyms[parentId] = (hyponyms[parentId] || []);
					hyponyms[parentId].push(childId);
				}
			}
			hyponymsReverseMapped = true;
			console.log('hyponyms mapping finished');
		}

		await sleep(1000);
	}

	createMetaphor();
}

async function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

reverseMap();
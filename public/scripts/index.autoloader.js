(async () =>
{
	let loadingBlock;

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("scripts/constants.js"));
	await Promise.all(loadingBlock);


	// -----------------------------
	// namespace-core
	// -----------------------------

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("externals/namespace-core/namespace-core.js"));
	await Promise.all(loadingBlock);


	// -----------------------------
	// namespace-enums
	// -----------------------------

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("externals/namespace-enums/namespace-enums.js"));
	await Promise.all(loadingBlock);


	// -----------------------------
	// namespace-html
	// -----------------------------

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("externals/namespace-html/namespace-html.js"));
	await Promise.all(loadingBlock);


	// -----------------------------
	// namespace-database
	// -----------------------------

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("scripts/namespace-database/Reminder.js"));
	await Promise.all(loadingBlock);

	loadingBlock = new Array();
	loadingBlock.push(new AsyncImporter("scripts/classes/Popup.js"));
	loadingBlock.push(new AsyncImporter("scripts/index.js"));
	await Promise.all(loadingBlock);

	WebPage.init();
})();
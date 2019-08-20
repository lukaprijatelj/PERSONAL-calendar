// -----------------------------
// Console
// -----------------------------


if (typeof module !== 'undefined' && module.exports)
{
	// this is NodeJS
	// do nothing
}
else
{
	console._log = console.log;
	console._error = console.error;
	console._warn = console.warn;

	console.log = function()
	{
		if (constants.IS_CONSOLE_ENABLED == false)
		{
			return;
		}
	
		console._log.apply(this, arguments);
	};
		
	console.error = function()
	{
		console._error.apply(this, arguments);
	};
	
	console.warn = function()
	{
		if (constants.IS_CONSOLE_ENABLED == false)
		{
			return;
		}
	
		console._warn.apply(this, arguments);
	};
}
if (typeof namespace == 'undefined')
{
    var namespace = {};
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = {};
}

namespace.core.Thread = (() => 
{
	function Thread(callback)
	{
		window.setTimeout(callback, 0);
	}

	Thread.prototype.dispose = function()
	{
		new Exception.NotImplemented();
	};

	return Thread;
})();

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = namespace.core.Thread;
}
if (typeof namespace == 'undefined')
{
    var namespace = {};
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = {};
}

namespace.core.Browser = (() => 
{
	function Browser()
	{
		// do nothing
	}

	Browser.prototype.setTitle = function(value)
	{
		document.title = value;
	};

	Browser.prototype.dispose = function()
	{
		new Exception.NotImplemented();
	};

	return Browser;
})();
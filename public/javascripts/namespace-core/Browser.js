if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
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
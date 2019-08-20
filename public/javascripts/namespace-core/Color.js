if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
}

namespace.core.Color = (() =>
{
	function Color(value)
	{
		this.red = null;
		this.green = null;
		this.blue = null;

		this._parse(value);
	}

	Color.prototype._parse = function(value)
	{
		new Exception.NotImplemented();
	};


	return Color;
})();
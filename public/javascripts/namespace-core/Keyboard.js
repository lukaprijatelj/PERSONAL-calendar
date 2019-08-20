if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}


// -----------------------------
// Global static keyboard logic
// -----------------------------

if (typeof namespace.__ == 'undefined')
{
    namespace.__ = new Object();
}

namespace.__.KEYBOARD =
{
	init: function()
	{
		new Exception.NotImplemented();
	}
};
namespace.__.KEYBOARD.init();



// -----------------------------
// Keyboard class
// -----------------------------

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
}

namespace.core.Keyboard = (() => 
{
	function Keyboard()
	{

	}

	Keyboard.prototype.onKeyPress = function(element, callback)
	{
		element.addEventListener("keypress", callback);

		// remove event listener once element is disposed
		GarbageCollector.addDispose(element, () =>
		{
			element.removeEventListener("keypress", callback);
		});
	},

	Keyboard.prototype.onKeyPressOnce = function(element, callback)
	{
		var _this = this;

		var preCallback = function()
		{
			element.removeEventListener("keypress", preCallback);
			callback();
		};

		_this.onKeyPress(element, preCallback);
	},

	Keyboard.prototype.dispose = function()
	{
		new Exception.NotImplemented();
	};

	return Keyboard;
})();
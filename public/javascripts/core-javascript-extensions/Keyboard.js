if (typeof namespace == 'undefined')
{
    var namespace = {};
}


// -----------------------------
// Global static keyboard logic
// -----------------------------

if (typeof namespace.__ == 'undefined')
{
    namespace.__ = {};
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
    namespace.core = {};
}

namespace.core.Keyboard = (() => 
{
	function Keyboard()
	{

	}

	Keyboard.prototype.dipose = function()
	{
		new Exception.NotImplemented();
	};

	return Keyboard;
})();
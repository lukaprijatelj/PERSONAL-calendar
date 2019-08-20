if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}


// -----------------------------
// Global static mouse logic
// -----------------------------

if (typeof namespace.__ == 'undefined')
{
    namespace.__ = new Object();
}

namespace.__.MOUSE =
{
	/**
	 * X position of the mouse cursor on the whole body.
	 */
	moveEvent: 0,

	init: function()
	{
		document.addEventListener('mousemove', namespace.__.MOUSE.onMouseMove, false);
	},

	/**
	 * Mouse cursor has moved - save it's new position.
	 */
	onMouseMove: function(event)
	{
		namespace.__.MOUSE.moveEvent = event;
	}
};
namespace.__.MOUSE.init();



// -----------------------------
// Mouse class
// -----------------------------

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
}

namespace.core.Mouse = (() => 
{
	function Mouse()
	{

	}

	Mouse.allowMiddleClick = function(event)
    {
        if (!event) 
        {
            return false;
        } 
        else if (event.ctrlKey || event.which == 2) 
        {
            event.stopImmediatePropagation();

            return true;
        } 
        else 
        {
            event.preventDefault();
            event.stopPropagation();

            return false;
        }
	};

	Mouse.prototype.onClick = function(element, callback)
	{
		element.addEventListener("click", callback);

		// remove event listener once element is disposed
		GarbageCollector.addDispose(element, () =>
		{
			element.removeEventListener("click", callback);
		});
	},

	Mouse.prototype.onClickOnce = function(element, callback)
	{
		var _this = this;

		var preCallback = function()
		{
			element.removeEventListener("click", preCallback);
			callback();
		};

		_this.onClick(element, preCallback);
	},

	Mouse.prototype.getPositionX = function()
	{
		return namespace.__.MOUSE.moveEvent.clientX;
	},

	Mouse.prototype.getPositionY = function()
	{
		return namespace.__.MOUSE.moveEvent.clientY;
	}
	
	Mouse.prototype.dispose = function()
	{
		new Exception.NotImplemented();
	};

	return Mouse;
})();
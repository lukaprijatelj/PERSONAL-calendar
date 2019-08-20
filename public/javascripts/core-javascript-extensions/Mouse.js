if (typeof namespace == 'undefined')
{
    var namespace = {};
}


// -----------------------------
// Global static mouse logic
// -----------------------------

if (typeof namespace.__ == 'undefined')
{
    namespace.__ = {};
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
    namespace.core = {};
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

	Mouse.prototype.getPositionX = function()
	{
		return namespace.__.MOUSE.moveEvent.clientX;
	},

	Mouse.prototype.getPositionY = function()
	{
		return namespace.__.MOUSE.moveEvent.clientY;
	}
	
	Mouse.prototype.dipose = function()
	{
		new Exception.NotImplemented();
	};

	return Mouse;
})();
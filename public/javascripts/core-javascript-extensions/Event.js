if (typeof namespace == 'undefined')
{
    var namespace = {};
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = {};
}

namespace.core.Event = (() => 
{
    /**
     * Class for custom events.
     * @constructor 
     */
    function Event()
    {
        /**
         * List of listener functions to be notified when event is invoked.
         * @private
         * @type {Array<Function>} 
         * @default
         */
        this._handlers = [];

        /**
         * Is event handler disabled.
         * @type {boolean}
         * @private
         * @default
         */
        this._isDisabled = false;
    };

    /**
     * Enables event handler.
     */
    Event.prototype.enable = function()
    {
        this._isDisabled = false;
    };

    /**
     * Disables event handler.
     */
    Event.prototype.disable = function()
    {
        this._isDisabled = true;
    };

    /**
     * Adds callback for when this event will be invoked.
     * @param {Function} handler - callback function for when event is invoked
     */
    Event.prototype.addHandler = function(handler)
    {
        if (!handler)
        {
            new Warning.ValueUndefined();
            return;
        }    

        for(var i = 0; i < this._handlers.length; i++)
        {
            var eventHandler = this._handlers[i];

            if (eventHandler == handler)
            {
                new Warning.Other('Cannot add handler function that already exists!');
                return;
            }
        }

        this._handlers.push(handler);
    };

    /**
     * Removes listener function.
     * @param {Function} handler - function listener that will be removed from array
     */
    Event.prototype.removeHandler = function(handler)
    {
        if (!handler)
        {
            new Warning.ValueUndefined();
            return;
        }    

        for(var i = 0; i < this._handlers.length; i++)
        {
            var eventHandler = this._handlers[i];

            if (eventHandler == handler)
            {
                this._handlers.splice(i, 1);
                break;
            }
        }
    };

    /**
     * Invokes event listeners.
     * Parameters are optional.
     * @param {*=} par1 - parameter (optional)
     * @param {*=} par2 - parameter (optional)
     * @param {*=} par3 - parameter (optional)
     * @param {*=} par4 - parameter (optional)
     * @param {*=} par5 - parameter (optional)
     * @param {*=} par6 - parameter (optional)
     * @param {*=} par7 - parameter (optional)
     * @param {*=} par8 - parameter (optional)
     * @param {*=} par9 - parameter (optional)
     * @param {*=} par10 - parameter (optional)
     */
    Event.prototype.invoke = function(par1, par2, par3, par4, par5, par6, par7, par8, par9, par10)
    {    
        if (this._isDisabled == true)
        {
            return;
        }

        for(var i = 0; i < this._handlers.length; i++)
        {
            var eventHandler = this._handlers[i];

            //debug('[Executing event handler #' + i + ']');
            
            eventHandler(par1, par2, par3, par4, par5, par6, par7, par8, par9, par10);
        }
    };

    /**
     * Removes all listener functions.
     */
    Event.prototype.removeAll = function()
    {
        this._handlers = [];
    };

    /**
     * Diposes event object.
     */
    Event.prototype.dipose = function()
	{
		this.removeAll();
	};

    return Event;
})();

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = namespace.core.Event;
}
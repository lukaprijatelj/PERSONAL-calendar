var _this = this;

if (typeof _this.namespace == 'undefined')
{
    _this.namespace = new Object();
}

if (typeof namespace.html == 'undefined')
{
    namespace.html = new Object();
}

/**
 * All functions needed to extend Div class can be implemented via HTMLDivElement.prototype object.
 */
(() => 
{
    let Popup = namespace.html.Popup = function()
    {
		let _this = document.createElement('popup');
		Object.cloneData(_this, Popup.prototype);
		Interface.inherit(_this, IDisposable);

		return _this;
	}
	Interface.inheritPrototype(Popup, IDisposable);
})();
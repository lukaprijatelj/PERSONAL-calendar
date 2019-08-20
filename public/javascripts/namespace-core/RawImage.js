/**
 * @requires core-javascript-extensions/Exception.js
 */

if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
}

namespace.core.RawImage = (() => 
{
    function RawImage(url)
    {
        this.url = url;
        this.width = null;
        this.height = null;
        this.pixels = [];
    }

    RawImage.prototype.dispose = function()
    {
        this.pixels = null;
    };

    return RawImage;
})();


if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = namespace.core.RawImage;
}
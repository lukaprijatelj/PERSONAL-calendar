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

namespace.core.Path = (() => 
{
    /**
     * Path object for easier path parsing
     * @param {string} value - filepath string value
     */
    function Path(value)
    {
        if (typeof value === 'undefined' || !value)
        {
            // 'undefined' is not allowed for path, because there is no directory or filename with this value

            new Exception.ValueUndefined();
        }

        // private properties
        this._value = value;

        // public properties
        this.extension = '';
        this.isFile = false;

        this.parse();
    }

    /**
     * Gets extension name for this path.
     */
    Path.prototype.parse = function()
    {
        let _this = this;

        let i = _this._value.length - 1;

        while (i >= 0)
        {
            let char = _this._value[i];

            if (char == '.')
            {
                // path is probably filepath

                _this.isFile = true;
                break;
            }
            else if (char == '\\' || char == '/')
            {
                // path is probably folder - we don't need to find dot character
                return;
            }

            i--;
        }

        if (i < 0)
        {
            return "";
        }

        // skip dot character so that it won't be present in extension
        i++;

        while (i < _this._value.length)
        {
            let char = _this._value[i];

            _this.extension += char;
            i++;
        }
    };

    /**
     * Gets extension name for this path.
     * @overrides
     */
    Path.prototype.toString = function()
    {
        let _this = this;

        return _this._value;
    };

    /**
     * Disposes path object.
     */
    Path.prototype.dispose = function()
    {
        // do nothing
    };

    return Path;
})();


if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = namespace.core.Path;
}
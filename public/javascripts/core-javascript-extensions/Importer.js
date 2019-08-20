/**
 * 
 * Example of how to use loader:
 * (async () =>
 * {
 *    await new namespace.core.AsyncImporter('test.js');
 *    await new namespace.core.AsyncImporter('test.css');
 * })();
 * 
 * @requires core-javascript-extensions/Exception.js
 * @requires core-javascript-extensions/Path.js
 * @requires core-javascript-extensions/HTMLElement.js
 */

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

namespace.__.IMPORTER = { };



// -----------------------------
// Mouse class
// -----------------------------

if (typeof namespace.core == 'undefined')
{
    namespace.core = {};
}

(() => 
{
    /**
     * Importer for *.js or *.css files.
     * @param {string} filepath - filepath of the .js or .css file
     */
    function AsyncImporter(filepath)
    {
        this.filepath = new namespace.core.Path(filepath);  
        this.tag = null; 
        this.isLoaded = false;
        
        return new Promise((resolve, reject) => 
        {
            this._init(resolve, reject);
        });
    }
    namespace.core.AsyncImporter = AsyncImporter;


    /**
     * Removes/unloads script file from HTML view.
     */
    AsyncImporter.prototype.dispose = function()
    {
        let _this = this;

        _this.tag.remove();

        // always call at the end of the function
        GarbageCollector.dispose(_this);
    };

    /**
     * Initializes importer.
     */
    AsyncImporter.prototype._init = function(resolve, reject)
    {
        let _this = this;

        if (typeof document == 'undefined')
        {
            // document object is needed, so that scripts are properly loaded by browser

            new Exception.ValueUndefined();
        }

        let extension = _this.filepath.extension;

        if (extension == 'js')
        {
            _this._loadJS(resolve, reject);
        }
        else if (extension == 'css')
        {
            _this._loadCSS(resolve, reject);
        }
        else
        {
            // currently we only support *.js and *.css files that's why we will throw invalid value exception if any other type is found

            new Exception.ValueInvalid();
        }
    };

    /**
     * Starts loading file.
     */
    AsyncImporter.prototype._loadJS = function(resolve, reject)
    {
        let _this = this;
    
        let loaderTag = document.querySelector('script[type="namespace-core:js-loader"]');

        if (!loaderTag || loaderTag.length == 0)
        {
            // loader tag is missing in HTML document - it should always be present on the *.html file

            new Exception.ValueUndefined();
        }
        
        _this.tag = document.createElement('script');
        _this.tag.setAttribute("type","text/javascript");

        let filepath = _this.filepath.toString();
        _this.tag.setAttribute("src", filepath);

        _this.tag.onload = () =>
        {
            _this.isLoaded = true;
            resolve();
        };
        _this.tag.onerror = () =>
        {
            _this.isLoaded = true;
            reject();
        };

        loaderTag.parentNode.insertBefore(_this.tag, loaderTag);
    };

    /**
     * Starts loading file.
     */
    AsyncImporter.prototype._loadCSS = function()
    {
        let _this = this;

        let loaderTag = document.querySelector('script[type="namespace-core:css-loader"]');

        if (!loaderTag || loaderTag.length == 0)
        {
            // loader tag is missing in HTML document - it should always be present on the *.html file
            
            new Exception.ValueUndefined();
        }

        _this.tag = document.createElement("link");
        _this.tag.setAttribute("rel", "stylesheet");
        _this.tag.setAttribute("type", "text/css");

        let filepath = _this.filepath.toString();
        _this.tag.setAttribute("href", filepath);

        _this.tag.onload = () =>
        {
            _this.isLoaded = true;
        };
        _this.tag.onerror = () =>
        {
            _this.isLoaded = true;

            console.error('');
        };

        loaderTag.parentNode.insertBefore(_this.tag, loaderTag);
    };
})();
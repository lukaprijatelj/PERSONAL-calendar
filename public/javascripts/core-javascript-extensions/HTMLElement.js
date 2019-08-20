/**
 * List of all animationEnd names for different browsers.
 * @constant
 * @type {string}
 * @default
 */
var ANIMATION_END_NAMES = 
{
	webkit: 'webkitAnimationEnd',
	standard: 'animationend',
	ms: ' msAnimationEnd'
};

/**
 * List of all transitionEnd names for different browsers.
 * @constant
 * @type {string}
 * @default
 */
var TRANSITION_END_NAMES = 
{
	webkit: 'webkitTransitionEnd',
	standard: 'transitionend'
};

HTMLElement.createElement = function(htmlString)
{
	var div = document.createElement('div');
	div.innerHTML = htmlString;
	return div.firstChild;
};

// crossbrowser version
HTMLElement.prototype.getOffset = function() 
{ 	
	var _this = this;
    var box = _this.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
};

// @author jQuery
HTMLElement.prototype.getOuterHeight = function()
{
	let elmHeight;
	let elmMargin;
	let elmPadding;
	let sum;
	let elm = this;

	if(document.all) 
	{
		// IE
		elmHeight = new namespace.core.Unit(elm.currentStyle.height);
		
		elmPadding = parseInt(elm.currentStyle.paddingTop, 10) + parseInt(elm.currentStyle.paddingBottom, 10);
		elmPadding = new namespace.core.Unit(elmMargin);

		elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
		elmMargin = new namespace.core.Unit(elmMargin);
	} 
	else 
	{
		// Mozilla
		elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
		elmHeight = new namespace.core.Unit(elmHeight);

		elmPadding = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('padding-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('padding-bottom'));
		elmPadding = new namespace.core.Unit(elmPadding);

		elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
		elmMargin = new namespace.core.Unit(elmMargin);
	}

	sum = namespace.core.Unit.add(elmHeight, elmPadding);
	sum = namespace.core.Unit.add(sum, elmMargin);
	
    return sum
}

HTMLElement.prototype.addClass = function(value)
{
    this.classList.add(value);

    return this;
};

HTMLElement.prototype.hasClass = function(value)
{
	for (var i=0; i<this.classList.length; i++)
	{
		if (this.classList[i] == value)
		{
			return true;
		}
	}
	
    return false;
};

/**
 * Invokes onDispose event.
 * Just assign .onDispose function to the element and it will automatically be disposed.
 */
Element.prototype._notifyOnDispose = function()
{
	var _this = this;
	
	if (_this.children.length == 0)
	{
		if (typeof _this.onDispose == 'function')
		{
			_this.onDispose();
		}

		return;
	}

	for(var i = 0; i < _this.children.length; i++) 
	{
		var el = _this.children[i];

		if(el && el.parentElement) 
		{
			el._notifyOnDispose();
		}
	}
};
NodeList.prototype._notifyOnDispose = HTMLCollection.prototype._notifyOnDispose = function() 
{
	var _this = this;

	for(var i = 0; i < _this.length; i++) 
	{
		var el = _this[i];

		if(el) 
		{
			el._notifyOnDispose();
        }
    }
};

/**
 * Remove function also calls .onDispose method that can be assigned to element.
 */
Element.prototype.remove = function() 
{
	var _this = this;
		
	_this.parentElement.removeChild(_this);	
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() 
{
	var _this = this;

	for(var i = _this.length - 1; i >= 0; i--) 
	{
		var el = _this[i];

		if(el && el.parentElement) 
		{
			el.remove();
        }
    }
}

HTMLElement.prototype.removeClass = function(value)
{
    this.classList.remove(value);

    return this;
};

HTMLElement.prototype.empty = function()
{
	let _this = this;

	//this.innerHTML = '';
	
	_this.children._notifyOnDispose(_this);
	_this.children.remove();
};

HTMLElement.prototype.hide = function()
{
    this.removeClass('visible');
    this.addClass('hidden');
};

HTMLElement.prototype.show = function()
{
    this.removeClass('hidden');
    this.addClass('visible');
};

HTMLElement.prototype.enableScrolling = function()
{
	this.removeClass('scrolling-disabled');
};

HTMLElement.prototype.disableScrolling = function()
{
    this.addClass('scrolling-disabled');
};

HTMLElement.prototype.enable = function()
{
	this.removeClass('disabled');
};

HTMLElement.prototype.isEnabled = function()
{
    return !this.hasClass('disabled');
};

HTMLElement.prototype.disable = function()
{
    this.addClass('disabled');
};

HTMLElement.prototype.isDisable = function()
{
    return this.hasClass('disabled');
};

/**
 * Adds callback for animation.
 * @param {string} animationClass - animation class
 * @param {Function=} callback - callback (optional)
 */
HTMLElement.prototype.cssAnimation = function(animationClass, callback)
{
	callback = callback ? callback : Function.empty;

	var element = this;
	var onAnimationEndRef = null;
	var onAnimationEnded = () =>
	{
		element.removeEventListener(ANIMATION_END_NAMES.webkit, onAnimationEndRef);
		element.removeEventListener(ANIMATION_END_NAMES.standard, onAnimationEndRef);
		element.removeEventListener(ANIMATION_END_NAMES.ms, onAnimationEndRef);
		element.removeClass(animationClass);             

		callback();
	};
	onAnimationEndRef = onAnimationEnded;

	element.addClass(animationClass);
	element.removeEventListener(ANIMATION_END_NAMES.webkit, onAnimationEndRef);
	element.removeEventListener(ANIMATION_END_NAMES.standard, onAnimationEndRef);
	element.removeEventListener(ANIMATION_END_NAMES.ms, onAnimationEndRef);

	var options = { once: true };

	element.addEventListener(ANIMATION_END_NAMES.webkit, onAnimationEndRef, options);
	element.addEventListener(ANIMATION_END_NAMES.standard, onAnimationEndRef, options);
	element.addEventListener(ANIMATION_END_NAMES.ms, onAnimationEndRef, options);
};
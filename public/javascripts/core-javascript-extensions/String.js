/**
 * Capitalize first letter.
 */
String.prototype.capitalize = function()
{
    let _this = this;

    if (_this.length < 1)
    {
        return _this;
    }

    let firstLetter = _this.charAt(0);
    let otherLetters = _this.slice(1);
    
    return firstLetter.toUpperCase() + otherLetters;
};

/**
 * Checks if string includes numbers.
 */
String.prototype.hasNumbers = function()
{
    let _this = this;

    if (_this.length < 1)
    {
        return false;
    }

    return /\d/.test(_this);
};

/**
 * Checks if string includes numbers.
 */
String.prototype.hasOnlyNumbers = function()
{
    let _this = this;

    if (_this.length < 1)
    {
        return false;
    }

    return  /^\d+$/.test(_this);
};

/**
 * Checks if string includes numbers.
 */
String.prototype.reverse = function()
{
	let _this = this;
	let newString = '';

	for (let i=_this.length - 1; i>=0; i--)
	{
		let char = _this[i];
		newString += char;
	}

    return newString;
};

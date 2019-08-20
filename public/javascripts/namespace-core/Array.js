/**
 * Checks if array is empty.
 */
Array.prototype.isEmpty = function()
{
	var _this = this;

	if (_this.length > 0)
	{
		return false;
	}

	return true;
};

/**
 * Checks if array is empty.
 */
Array.prototype.isNotEmpty = function()
{
	var _this = this;

	return !_this.isEmpty();
};

/**
 * Copies array and returns copy.
 */
Array.clone = function(array)
{
    if (!array)
    {
        return null;
    }

    return array.slice();
};

/**
 * Gets first element in array.
 */
Array.prototype.getFirst = function()
{
	var array = this;
	return array.length > 0 ? array[0] : undefined;
};

/**
 * Gets last element in array.
 */
Array.prototype.getLast = function()
{
	var array = this;
	return array.length > 0 ? array[array.length - 1] : undefined;
};

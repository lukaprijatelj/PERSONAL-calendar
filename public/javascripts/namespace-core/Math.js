/**
 * Rounds math
 */
Math.roundToTwoDecimals = function(value)
{
	return Math.round(value * 100) / 100;
};

/**
 * Is value positive (assuming 0 is still positive).
 */
Math.isPositive = function(value)
{
	return value >= 0;
};

/**
 * Is value negative.
 */
Math.isNegative = function(value)
{
	return value < 0;
};

/**
 * Convert positive number to negative or return negative number.
 */
Math.toNegative = function(value)
{
	if (Math.isNegative())
	{
		return value;
	}

	return -value;
};

/**
 * Convert negative number to positive or return positive number.
 */
Math.toPositive = function(value)
{
	if (Math.isNegative())
	{
		return -value;
	}

	return value;
};
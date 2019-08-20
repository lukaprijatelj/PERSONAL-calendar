/**
 * Timestamp to days
 * @param {number} time timestamp
 * @return {number} ceiled days
 */
Date.timestampToDays = function(time)
{
	return Math.ceil(time / datetime.DAY_MSEC);
};

/**
 * Timestamp to hours
 * @param {number} time timestamp
 * @return {number} ceiled hours
 */
Date.timestampToHours = function(time)
{
	return Math.ceil(time / (1000 * 60 * 60));
};

/**
 * Calculate date difference
 * @param {Date} a - first date
 * @param {Date} b - second date
 * @return {number} date difference
 */
Date.diffInDays = function(a, b)
{
	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / datetime.DAY_MSEC);
};

/**
 * Returns number of milliseconds till now.
 * @return {number}
 */
Date.nowInMiliseconds = function()
{
	var now = new Date();

	return now.getTime();
};

/**
 * Get current date at midnight
 * @return {Date} current date at midnight
 */
Date.today = function()
{
	var today = new Date();
	
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

	return today;
};

/**
 * Return given datetime to date at midnight (00:00).
 * @param {Date} date - timestamp to be transformed
 * @return {Date} date at midnight
 */
Date.getMidnightDate = function(date)
{
	var newDate = new Date(date.getTime());

	newDate.setHours(0);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	newDate.setMilliseconds(0);

	return newDate;
};
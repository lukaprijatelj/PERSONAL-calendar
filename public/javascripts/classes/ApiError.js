function ApiError()
{
	this.type = -1;

	this.message = '';
	this.details = '';
	this.status = 400;
}

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = ApiError;
}

var _this = this;

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	_this = global;
}

if (typeof _this.namespace == 'undefined')
{
    _this.namespace = new Object();
}

if (typeof namespace.database == 'undefined')
{
    namespace.database = new Object();
}


namespace.database.Reminder = (() =>
{
	function Reminder()
	{
		this.type = 'reminder';
		this._id = null;
		this.startTimestamp = null;
		this.endTimestamp = null;

		this.title = null;
		this.description = null;

		this.notifications = null;

		this.attachments = null;
	}

	return Reminder;
})();

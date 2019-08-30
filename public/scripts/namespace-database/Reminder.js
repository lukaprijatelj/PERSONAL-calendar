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

	Reminder.parse = function(data)
	{
		let reminder = new Reminder();

		reminder._id = data.hasOwnProperty('_id') ? data._id : -1;
		reminder.startTimestamp = data.hasOwnProperty('startTimestamp') ? data.startTimestamp : -1;
		reminder.endTimestamp = data.hasOwnProperty('endTimestamp') ? data.endTimestamp : -1;

		reminder.title = data.hasOwnProperty('title') ? data.title : '';
		reminder.description = data.hasOwnProperty('description') ? data.description : '';

		reminder.notifications = data.hasOwnProperty('notifications') ? data.notifications : new Array();
		reminder.attachments = data.hasOwnProperty('attachments') ? data.attachments : new Array();

		return reminder;
	};

	return Reminder;
})();
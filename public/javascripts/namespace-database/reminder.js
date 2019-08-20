if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}

if (typeof namespace.database == 'undefined')
{
    namespace.database = new Object();
}


namespace.database.Reminder = (() =>
{
	function Reminder()
	{
		this.startTimestamp = null;
		this.endTimestamp = null;

		this.title = null;
		this.description = null;

		this.notifications = null;

		this.attachments = null;
	}

	return Reminder;
})();
var uuidv1 = require('uuid/v1');
var PouchDB = require('pouchdb');


/**
 * Notes:
 * 	- Recall that put() requires you to supply your own doc ID, whereas post() generates a random one for you. 
 */

var DATABASE =
{
	/**
	 * Database instance.
	 * @type {PouchDB}
	 */
	db: null,

	
	init: function()
	{
		console.log('[Database] Initialize');

		DATABASE.db = new PouchDB(DATABASE_ROOT);
	},
	

	/**
	 * Adds uploaded file record to DATABASE.
	 */
	addReminder: async function(title)
    {		
		let reminder = new namespace.database.Reminder();
		reminder._id = uuidv1();
		reminder.title = title;

		try
		{
			await DATABASE.db.put(reminder);
		}
		catch(error)
		{
			console.error(error);
		}
		
		return true;
    },

	/**
	 * Gets all files that are uploaded
	 */
    getReminders: async function()
    {
		var result = await DATABASE.db.find({ selector: { type: 'reminder' } });

        return result;
	}
};

module.exports = DATABASE;
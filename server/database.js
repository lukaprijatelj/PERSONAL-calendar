var uuidv1 = require('uuid/v1');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/**
 * Notes:
 * 	- Recall that put() requires you to supply your own doc ID, whereas post() generates a random one for you. 
 */

var DATABASE =
{
	/**
	 * Database instance.
	 * @type {MongoDB}
	 */
	db: null,

	
	init: function()
	{
		console.log('[Database] Initialize');

		MongoClient.connect(MONGO_DATABASE_URL, DATABASE.onDatabaseConnected);
	},
	
	onDatabaseConnected: function(err, db)
    {
        if (err)
        {
            throw err;
		} 
		
		console.log("[Database] Connected!");

        DATABASE.db = db.db(DATABASE_NAME);        
    },

	/**
	 * Adds uploaded file record to DATABASE.
	 */
	addReminder: async function(title)
    {	
		let remindersCollection = DATABASE.db.collection('reminders');	

		let reminder = new namespace.database.Reminder();
		reminder._id = uuidv1();
		reminder.title = title;

		await remindersCollection.insertOne(reminder);
    },

	/**
	 * Gets all files that are uploaded
	 */
    getReminders: async function()
    {
		var remindersCollection = DATABASE.db.collection('reminders');

		var result = await remindersCollection.find({}).toArray();
		
        return result;
	}
};

module.exports = DATABASE;
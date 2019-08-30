var upload = require('./upload.js');
var DATABASE = require('./database.js');
var ApiError = require('../public/scripts/classes/ApiError.js');
var options = null;

var API =
{

    init: function(app)
    {
		console.log('[Api] Initialize');

        // mutiple callbacks are separated with comma.
        // first upload.single parses file and saves it into request.file
		app.post(API_BASE_URL + '/uploadScene', upload.single('reserved_word-scene'), API.onUploadFile);
	
		app.post(API_BASE_URL + '/addReminder', API.onAddReminder);
		app.post(API_BASE_URL + '/getReminders', API.onGetReminders);
	},

	/**
	 * Respond that error has occured.
	 */
	errorHandler: function(error, request, response, next) 
	{
		if (!(error instanceof ApiError))
		{
			next(error);
			return;
		}

		response.status(error.status);
		response.send(error);
	},

	/**
	 * Catches users scene and saves it to local storage.
	 */
    onUploadFile: function(request, response, next)
    {
		console.log("[Api] File was uploaded");

		var filename = request.file.filename;
		var path = request.file.path;
		
		DATABASE.addUploadedFile(filename, path);
	
		response.status(200).send();
	},

	/**
	 * Adds remidner to database.
	 * It will also return error if present.
	 */
	onAddReminder: async function(request, response, next)
	{
		try
		{
			let data = request.body;

			await DATABASE.addReminder('test');

			response.status(200).send();
		}
		catch (error)
		{
			let result = new ApiError();
			result.message = error.message;
			result.details = error.stack;

			next(result);
		}
	},

	/**
	 * Returns a list of all reminders.
	 */
	onGetReminders: async function(request, response)
	{
		try
		{
			let result = await DATABASE.getReminders();

			response.status(200).send(result);
		}
		catch (error)
		{
			let result = new ApiError();
			result.message = error.message;
			result.details = error.stack;

			next(result);
		}
	}
};

module.exports = API;
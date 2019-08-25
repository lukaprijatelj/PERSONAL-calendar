var upload = require('./upload.js');
var DATABASE = require('./database.js');
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
	 * Catches users scene and saves it to local storage.
	 */
    onUploadFile: function(request, response)
    {
		console.log("[Api] File was uploaded");

		var filename = request.file.filename;
		var path = request.file.path;
		
		DATABASE.addUploadedFile(filename, path);
	
		response.sendStatus(200);
	},

	onAddReminder: async function(request, response)
	{

		DATABASE.addReminder('test');

		response.sendStatus(200);
	},

	onGetReminders: async function(request, response)
	{

		let result = await DATABASE.getReminders();

		response.send(result);
	}
};

module.exports = API;
var upload = require('./upload.js');
var DATABASE = require('./database.js');
var constants = require('../public/javascripts/constants.js');
var Exception = require('../public/javascripts/namespace-core/Exception.js');
var Warning = require('../public/javascripts/namespace-core/Warning.js');
var options = null;



var API =
{
	/**
	 * Base url API access.
	 */
	baseUrl: '/api',

	/**
	 * Admin client session ID.
	 */
	adminSessionId: '',

	/**
	 * Is rendering service currently running.
	 */
	isRenderingServiceRunning: false,


    init: function(app)
    {
		console.log('[Api] Initializing');

        // mutiple callbacks are separated with comma.
        // first upload.single parses file and saves it into request.file
		app.post(API.baseUrl + '/uploadScene', upload.single('reserved_word-scene'), API.onUploadFile);
	
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
	
		response.status(200);	
	}
};

module.exports = API;
var _this = this;

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	_this = global;
}

_this.IS_DEBUG_MODE = true;
_this.IS_CONSOLE_ENABLED = true;

_this.API_BASE_URL = '/api';
_this.DATABASE_NAME = 'PERSONAL-calendar';
_this.MONGO_DATABASE_URL = 'mongodb://localhost:27017/' + _this.DATABASE_ROOT;

_this.NODEJS_PORT = 30003;


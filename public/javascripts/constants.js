var _this = this;

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	_this = global;
}

_this.IS_DEBUG_MODE = true;
_this.IS_CONSOLE_ENABLED = true;

_this.API_BASE_URL = '/api';
_this.DATABASE_ROOT = 'database';

_this.NODEJS_PORT = 30003;


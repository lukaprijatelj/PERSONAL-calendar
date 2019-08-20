
function Char()
{

}

Char.isDigit = function(_this)
{
	if (_this >= '0' && _this <= '9') 
	{
		return true;
	} 
	
	return false;
}

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = Char;
}
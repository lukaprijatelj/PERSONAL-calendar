// namespace
var Warning = new Object();

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = Warning;
}


Warning.NotImplemented = function()
{
    console.warn('Logic is not yet implemented!');
},
    
Warning.InputMissing = function()
{
    console.warn('Input is missing!');
};

Warning.ArrayEmpty = function()
{
    console.warn('Array is empty!');
};

Warning.ArrayNotEmpty = function()
{
    console.warn('Array must be empty!');
};

Warning.ValueUndefined = function()
{
    console.warn('Value is undefined!');
};

Warning.ValueInvalid = function(value)
{
    console.warn('Value "' + value + '" is invalid!');
};

Warning.Other = function(message)
{
    console.warn(message);
};

// namespace
var Exception = new Object();

if (typeof module !== 'undefined' && module.exports)
{
	// export for nodeJS use
	module.exports = Exception;
}

Exception.NotImplemented = function()
{
    throw new Error('Logic is not yet implemented!');
},
    
Exception.InputMissing = function()
{
    throw new Error('Input is missing!');
};

Exception.RendererMissing = function()
{
    throw new Error('Renderer is missing!');
};

Exception.ArrayEmpty = function()
{
    throw new Error('Array is empty!');
};

Exception.ArrayNotEmpty = function()
{
    throw new Error('Array must be empty!');
};

Exception.ValueUndefined = function()
{
    throw new Error('Value is undefined!');
};

Exception.ValueInvalid = function(value)
{
    throw new Error('Value "' + value + '" is invalid!');
};

Exception.Other = function(message)
{
    throw new Error(message);
};



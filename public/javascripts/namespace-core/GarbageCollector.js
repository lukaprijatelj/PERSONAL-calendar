var GarbageCollector =
{
    // do nothing
};

GarbageCollector.dispose = function(disposableObject)
{
	if (GarbageCollector.isDisposable(element) == false)
	{
		// element is not disposable
		return;
	}

	disposableObject.onDispose.invoke();
	disposableObject.onDispose.dispose();
};

GarbageCollector.isDisposable = function(element)
{
	if (!element)
	{
		return false;
	}
	
	if (!element.onDispose)
	{
		return false;
	}

	return true;
};

GarbageCollector.addDispose = function(element, callback)
{
	if (!element.onDispose)
	{
		element.onDispose = new namespace.core.Event();
	}

	element.onDispose.addHandler(callback);
};

GarbageCollector.removeDispose = function(element, callback)
{
	if (!element.onDispose)
	{
		return;
	}

	element.onDispose.removeHandler(callback);
};
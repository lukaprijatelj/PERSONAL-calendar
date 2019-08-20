if (typeof namespace == 'undefined')
{
    var namespace = {};
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = {};
}

namespace.core.Ajax = (() => 
{
	/**
	 * Asynchronous call.
	 */
	function Ajax(url)
	{
		this.url = url;
		this.method = 'GET';
	}

	Ajax.prototype.send = function(data)
	{
		let _this = this;
		let promise = new Promise((resolve, reject) =>
		{
			var xhr= new XMLHttpRequest();
			xhr.open(_this.method, _this.url, true);
			xhr.onreadystatechange = function() 
			{
				if (this.readyState !== 4)
				{
					return;
				} 

				if (this.status!==200)
				{
					new Warning.Other(this.status);

					reject();
					return;
				} 

				resolve(this);
				//document.getElementById('y').innerHTML= this.responseText;
			};
			xhr.send(data);
		});

		return promise;
	};

	return Ajax;
})();
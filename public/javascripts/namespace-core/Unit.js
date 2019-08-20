if (typeof namespace == 'undefined')
{
    var namespace = new Object();
}

if (typeof namespace.core == 'undefined')
{
    namespace.core = new Object();
}

namespace.core.Unit = (() => 
{
	var units = 
	{
		PX: 'px',
		PERCENTAGE: '%'
	};

	function Unit(value)
	{
		this.value;
		this.unit;

		this._parse(value);
	}

	Unit.prototype._parse = function(value)
	{
		let _this = this;

		if (typeof value == "string")
		{
			let unit = '';
		
			for (var i=value.length-1; i >= 0; i--)
			{
				let char = value[i];
		
				if (Char.isDigit(char))
				{
					break;
				}
	
				unit += char;
			}
	
			if (unit != '')
			{
				_this.unit = unit.reverse();				
			}
			else
			{
				_this.unit = units.PX;
			}

			let newValue = value.substring(0, i + 1);

			if (newValue != '')
			{
				_this.value = parseInt(newValue, 10);
			}
			else
			{
				_this.value = 0;
			}			
		}
		else if (typeof value == "number")
		{
			_this.unit = units.PX;
			_this.value = value;
		}
		else
		{
			new Exception.ValueInvalid();
		}
	};

	Unit.add = function(val1, val2)
	{
		if (!(val1 instanceof Unit))
		{
			new Exception.Other('Require namespace.core.Unit type!');
		}

		if (!(val2 instanceof Unit))
		{
			new Exception.Other('Require namespace.core.Unit type!');
		}

		if (val1.unit != val2.unit)
		{
			new Exception.Other('Units are not the same!');
		}

		var unit = arguments[0].unit;
		var sum = val1.value + val2.value;

		return new Unit(sum + unit);
	};

	Unit.subtract = function(val1, val2)
	{
		if (!(val1 instanceof Unit))
		{
			new Exception.Other('Require namespace.core.Unit type!');
		}

		if (!(val2 instanceof Unit))
		{
			new Exception.Other('Require namespace.core.Unit type!');
		}

		if (val1.unit != val2.unit)
		{
			new Exception.Other('Units are not the same!');
		}

		var unit = arguments[0].unit;
		var sum = val1.value - val2.value;

		return new Unit(sum + unit);
	};

	Unit.prototype.toString = function()
	{
		let _this = this;

		if (_this.unit == units.NONE)
		{
			return '' + this.value;
		}

		return _this.value + _this.unit;
	}

	Unit.prototype.toPx = function()
	{
		let _this = this;
		
		_this.unit = units.PX;
	};

	Unit.prototype.toPercent = function(maxValue)
	{
		let _this = this;

		_this.unit = units.PERCENTAGE;
	};

	Unit.prototype.dispose = function()
	{
		// do nothing
	};

	return Unit;
})();
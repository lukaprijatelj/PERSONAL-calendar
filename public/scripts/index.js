var db = new PouchDB('my_database');

var GLOBALS =
{
	init: function()
	{
		GLOBALS.loadMonthView(Date.today());
	},

	

	loadMonthView: function(currentDay)
	{
		let layer = document.querySelector('layer#calendar');
		layer.empty();

		let monthView = HTMLElement.create('<month-view></month-view>');

		let header = HTMLElement.create('<div class="header"></div>');
		header.appendChild('<div>' + Date.getDayName(1) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(2) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(3) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(4) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(5) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(6) + '</div>');
		header.appendChild('<vertical-line></vertical-line>');
		header.appendChild('<div>' + Date.getDayName(0) + '</div>');
		monthView.appendChild(header);

		let zeroDate = Date.clone(currentDay);
		zeroDate.setDate(1);
		
		var dayIndex = zeroDate.getDay();

		if (dayIndex == 0)
		{
			dayIndex = 7;
		}

		dayIndex--;
		zeroDate.setDate(zeroDate.getDate() - dayIndex);

		let DAYS_IN_WEEK = 7;

		while (zeroDate.getMonth() <= currentDay.getMonth())
		{
			let week = HTMLElement.create('<week></week>');

			for (let j=0; j<DAYS_IN_WEEK; j++)
			{
				let dayName = Date.getDayName((j + 1) % DAYS_IN_WEEK);
				let day = HTMLElement.create('<day data-day-name="' + dayName + '" class="clickable"></day>');
				let wrapper = HTMLElement.create('<wrapper_></wrapper_>');
				wrapper.appendChild('<title>' + zeroDate.getDate() + '</title>');
				wrapper.appendChild('<list></list>');
				day.appendChild(wrapper);
				
				day.onClick(GLOBALS.onDayClick.bind(day));

				if (zeroDate.getMonth() != currentDay.getMonth())
				{
					day.addClass('not-current-month');
				}

				if (j > 0)
				{
					week.appendChild('<vertical-line></vertical-line>');
				}

				week.appendChild(day);
				zeroDate.nextDay();
			}

			monthView.appendChild('<horizontal-line></horizontal-line>');
			monthView.appendChild(week);
		}

		layer.appendChild(monthView);
	},

	addReminder: async function()
	{
		var ajax = new namespace.core.Ajax(API_BASE_URL + '/addReminder');
		var result = await ajax.send({info: 'test'});
		console.log(result);
	},

	onDayClick: async function(event)
	{
		var day = this;

		let popup = HTMLElement.create('<popup></popup>');
		
		let wrapper = HTMLElement.create('<wrapper_></wrapper_>');
		popup.appendChild(wrapper);

		let topBar = HTMLElement.create('<div class="top-bar"></div>');
		wrapper.appendChild(topBar);

		let middleBar = HTMLElement.create('<div class="middle-bar"></div>');
		wrapper.appendChild(middleBar);

		let bottomBar = HTMLElement.create('<div class="bottom-bar"></div>');
		wrapper.appendChild(bottomBar);

		let dayOffset = day.getOffset();
		let dayHeight = day.getOuterHeight();
		dayHeight = namespace.core.Unit.divide(dayHeight, 2);

		let left = new namespace.core.Unit(dayOffset.left);
		let top = new namespace.core.Unit(dayOffset.top);
		top = namespace.core.Unit.add(top, dayHeight);

		top = namespace.core.Unit.subtract(top, popup.getOuterHeight());

		popup.style.marginTop = top.toString();
		popup.style.marginLeft = left.toString();

		let list = document.querySelector('layer#popups>list');
		list.appendChild(popup);

		let layer = document.querySelector('layer#popups');
		layer.show();
	},

	onPopupCurtainClick: function()
	{
		let list = document.querySelector('layer#popups>list');
		list.empty();

		let layer = document.querySelector('layer#popups');
		layer.hide();
	},
};
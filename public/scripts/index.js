var db = new PouchDB('my_database');
var WebApplication = new namespace.core.WebApplication('PERSONAL-calendar');

var WebPage = new namespace.core.WebPage('Index');

/**
 * Initializes index.html page.
 */
WebPage.init = function()
{
	WebPage.loadMonthView(Date.today());
},

/**
 * Starts rendering current month view.
 */
WebPage.loadMonthView = function(currentDay)
{
	let layer = document.querySelector('layer#calendar');
	layer.empty();

	let monthView = HTMLElement.parse('<month-view></month-view>');

	let header = HTMLElement.parse('<div class="header"></div>');
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
		let week = HTMLElement.parse('<week></week>');

		for (let j=0; j<DAYS_IN_WEEK; j++)
		{
			let dayName = Date.getDayName((j + 1) % DAYS_IN_WEEK);
			let day = HTMLElement.parse('<day data-day-name="' + dayName + '" class="clickable"></day>');
			let wrapper = HTMLElement.parse('<wrapper_></wrapper_>');
			wrapper.appendChild('<title>' + zeroDate.getDate() + '</title>');
			wrapper.appendChild('<list></list>');
			day.appendChild(wrapper);
			
			day.onClick(WebPage.onDayClick.bind(day));

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
};

/**
 * Adds reminder for this day.
 */
WebPage.addReminder = async function()
{
	var ajax = new namespace.core.Ajax(API_BASE_URL + '/addReminder');
	var result = await ajax.send({info: 'test'});
	console.log(result);
};

/**
 * Shows popup on day click.
 */
WebPage.onDayClick = async function(event)
{
	var day = this;

	let popup = HTMLElement.parse('<popup></popup>');
	
	let wrapper = HTMLElement.parse('<wrapper_></wrapper_>');
	popup.appendChild(wrapper);

	let topBar = HTMLElement.parse('<div class="top-bar"></div>');
	wrapper.appendChild(topBar);

	let middleBar = HTMLElement.parse('<div class="middle-bar"></div>');
	wrapper.appendChild(middleBar);

	let bottomBar = HTMLElement.parse('<div class="bottom-bar"></div>');
	wrapper.appendChild(bottomBar);

	let dayOffset = day.getOffset();
	let dayHeight = day.getOuterHeight();
	dayHeight = Unit.divide(dayHeight, 2);

	let left = new Unit(dayOffset.left);
	let top = new Unit(dayOffset.top);
	top = Unit.add(top, dayHeight);

	top = Unit.subtract(top, popup.getOuterHeight());

	popup.style.marginTop = top.toString();
	popup.style.marginLeft = left.toString();

	let list = document.querySelector('layer#popups>list');
	list.appendChild(popup);

	let layer = document.querySelector('layer#popups');
	layer.show();
};

/**
 * Hides popup on curtain click.
 */
WebPage.onPopupCurtainClick = function()
{
	let list = document.querySelector('layer#popups>list');
	list.empty();

	let layer = document.querySelector('layer#popups');
	layer.hide();
};
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

	let DAYS_IN_WEEK = 7;
	let days = namespace.html.DatePicker.getDataForMonth(currentDay);

	for (i=0; i<days.length;)
	{
		let week = HTMLElement.parse('<week></week>');
		
		for (let j=0; j<DAYS_IN_WEEK; j++)
		{
			let zeroDate = days[i];
			let dayName = Date.getDayName((j + 1) % DAYS_IN_WEEK);
			let day = HTMLElement.parse('<day data-day-name="' + dayName + '" class="clickable"></day>');
			let wrapper = HTMLElement.parse('<wrapper_></wrapper_>');
			wrapper.appendChild('<title>' + zeroDate.getDate() + '</title>');
			wrapper.appendChild('<list></list>');
			day.appendChild(wrapper);
			
			day.onClick(WebPage.onDayClick.bind(day, zeroDate));

			if (zeroDate.getMonth() != currentDay.getMonth())
			{
				day.addClass('not-current-month');
			}

			if (j > 0)
			{
				week.appendChild('<vertical-line></vertical-line>');
			}

			week.appendChild(day);
			i++;
		}

		monthView.appendChild('<horizontal-line></horizontal-line>');
		monthView.appendChild(week);
	}

	layer.appendChild(monthView);
};

/**
 * Shows popup on day click.
 */
WebPage.onDayClick = async function(date, event)
{
	var day = this;

	let popup = new namespace.html.Popup();
	popup.cssAnimation('fade-in');
	
	let wrapper = new namespace.html.Wrapper();
	popup.appendChild(wrapper);


	// -----------------------------
	// top bar
	// -----------------------------

	let topBar = new namespace.html.Div();
	topBar.addClass('top-bar');
	wrapper.appendChild(topBar);

	var title = new namespace.html.TextInput();
	title.addClass('title');
	title.setAttribute('placeholder', 'Enter title...');
	topBar.appendChild(title);


	// -----------------------------
	// middle bar
	// -----------------------------

	let middleBar = new namespace.html.Div();
	middleBar.addClass('middle-bar');
	wrapper.appendChild(middleBar);

	let onDateClick = (event) =>
	{
		let view = event.target;
		view.addClass('selected');

		let picker = new namespace.html.DatePicker(date);
		picker.onDispose.addListener(() =>
		{
			view.removeClass('selected');
		}, true);
		picker.onClose.addListener(() =>
		{
			WebPage.hideLastPopup();
			GarbageCollector.dispose(picker);
		}, true);
		picker.onDatePick.addListener((date) =>
		{
			view.date = date;
			view.value = Date.format(date, 'dd MMM yyyy');
		}, true);

		let left = view.getLeft();
		let top = view.getTop();
		top = Unit.add(top, view.getOuterHeight());

		let anchor = new namespace.html.Anchor(picker);
		anchor.setPosition(top, left);

		let curtain = new namespace.html.Curtain();
		curtain.onClick(WebPage.hideLastPopup);

		let list = document.querySelector('layer#popups');
		list.appendChild(curtain);
		list.appendChild(picker);
	};

	var fromDate = new namespace.html.TextInput();
	fromDate.addClass('from-date');
	fromDate.date = date;
	fromDate.value = Date.format(date, 'dd MMM yyyy');
	fromDate.onClick(onDateClick);	
	middleBar.appendChild(fromDate);

	var toDate = new namespace.html.TextInput();
	toDate.addClass('to-date');
	toDate.date = date;
	toDate.value = Date.format(date, 'dd MMM yyyy');
	toDate.onClick(onDateClick);
	middleBar.appendChild(toDate);

	var timeInput = new namespace.html.TextInput();
	timeInput.addClass('time');
	timeInput.value = Date.format(date, 'hh:mm');
	middleBar.appendChild(timeInput);

	var description = new namespace.html.TextInput();
	description.addClass('description');
	description.setAttribute('placeholder', 'Enter description...');
	middleBar.appendChild(description);
	

	// -----------------------------
	// bottom bar
	// -----------------------------

	let bottomBar = new namespace.html.Div();
	bottomBar.addClass('bottom-bar');
	wrapper.appendChild(bottomBar);

	let cancel = new namespace.html.Button('cancel');
	cancel.onClick(WebPage.onCancelClick);
	bottomBar.appendChild(cancel);

	let save = new namespace.html.Button('save');
	save.addClass('dark');
	save.addClass('save');
	save.onClick(WebPage.onSaveClick);
	bottomBar.appendChild(save);


	// -----------------------------
	// position popup
	// -----------------------------

	let dayHeight = day.getOuterHeight();
	dayHeight = Unit.divide(dayHeight, 2);

	let left = day.getLeft();
	let top = day.getTop();
	top = Unit.add(top, dayHeight);

	top = Unit.subtract(top, popup.getOuterHeight());

	let anchor = new namespace.html.Anchor(popup);
	anchor.setPosition(top, left);


	// -----------------------------
	// show popups layer
	// -----------------------------

	let layer = document.querySelector('layer#popups');
	layer.appendChild(popup);
};

/**
 * Adds reminder for this day.
 */
WebPage.addReminder = async function(title, startTimestamp, endTimestamp, description)
{
	var ajax = new namespace.core.Ajax(API_BASE_URL + '/addReminder');

	let data = new namespace.database.Reminder();
	data.title = title;
	data.startTimestamp = startTimestamp;
	data.endTimestamp = endTimestamp;
	data.description = description;

	var result = await ajax.send(data);
	console.log(result);
};

/**
 * Save button was clicked.
 */
WebPage.onSaveClick = function()
{
	let title = document.querySelector('popup input.title');
	let description = document.querySelector('popup input.description');
	let time = document.querySelector('popup input.time');
	let fromDate = document.querySelector('popup input.from-date');
	let toDate = document.querySelector('popup input.to-date');
	var anyErrors = false;

	var timeObj = new Date('1970-01-01T' + time.value + 'Z');
	var fromObj = Date.parse(fromDate.value);
	var toObj = Date.parse(toDate.value);

	if (!title.value)
	{
		title.addError();
		anyErrors = true;
	}

	if (isNaN(timeObj))
	{
		time.addError();
		anyErrors = true;
	}

	if (isNaN(fromObj))
	{
		fromDate.addError();
		anyErrors = true;
	}

	if (isNaN(toObj))
	{
		toDate.addError();
		anyErrors = true;
	}

	if (anyErrors == true)
	{
		return;
	}

	var realFrom = new Date(fromDate.value + ' ' + time.value);
	WebPage.addReminder(title.value, realFrom.getTime(), toObj.getTime(), description.value);

	WebPage.hidePopupsLayer();
};

/**
 * Cancel button was clicked.
 */
WebPage.onCancelClick = function()
{
	WebPage.hidePopupsLayer();
};

/**
 * Hides popups layer.
 */
WebPage.hideLastPopup = function()
{
	let popup = document.querySelector('layer#popups > *:last-child');

	// removes curtain
	popup.previousSibling.remove();
	popup.remove();
};

/**
 * Hides popup on curtain click.
 */
WebPage.onPopupCurtainClick = function(event)
{
	let mouse = new namespace.core.Mouse(event);
	let list = document.querySelector('layer#popups');
	
	if (mouse.isTarget(list) == false)
	{
		return;
	}

	WebPage.hidePopupsLayer();
};

/**
 * Hides popups layer.
 */
WebPage.hidePopupsLayer = function()
{
	let list = document.querySelector('layer#popups');
	list.empty();
};

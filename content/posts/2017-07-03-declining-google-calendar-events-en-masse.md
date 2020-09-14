---
title: "Holiday time - bulk declining Google Calendar events"
date: 2017-07-03T19:00:00
categories: scripting
---

I'm getting married in a few weeks, so recently I wanted a way to decline about 3 weeks worth of Google Calendar events en-masse. Since I was using Google Apps for our organisation's calendar, I found the easiest way to accomplish this was to bust out some [Google Apps Scripting](https://www.google.com/script/start/), which lets you script a number of Google Apps in your domain, including the [Calendar](https://developers.google.com/apps-script/reference/calendar/calendar-event). 

See an example below on how to bulk decline Google Calendar events using Google Apps Scripting - you'll just need a calendar name & a date range and run this via the script console:

```javascript
function GCalHoliday() {
  var fromDate = new Date('July 17, 2017 00:00:00 +0100');
  var toDate = new Date('August 8, 2017 23:30:00 +0100');
  var calendarName = '<Your Calendar - e.g. joe@bloggs.com>';

  var calendar = CalendarApp.getCalendarsByName(calendarName)[0];
  var events = calendar.getEvents(fromDate, toDate, {});
  Logger.log('Events: ' + events.length);

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    // try/catch for setting status - may get exceptions where events 
    // are on calendar, but user is not a "guest" of the event - these can be ignored
    try {
      // !!!
      // ev.setMyStatus(CalendarApp.GuestStatus.NO); // Uncomment to actually update status
      // !!!
    } catch (e) {
      Logger.log('Error updating event status ' + e);
    }
    Logger.log('Item ' + ev.getTitle() + ' found on ' + ev.getStartTime() + ' marked as declined');
  }
}
```
---
title: Using cookies to calculate a user's timezone
date: 2009-01-17T21:00:00
---

A few days ago I [discovered](http://github.com/entp/xtt/tree/master) a
quick & easy way few to use cookies to help your Rails app get a user's
timezone, without prompting. It's pretty easy to implement:

First up: set a cookie, any cookie:

```javascript
var date = new Date();
// returns offset from GMT in minutes
var offset = date.getTimezoneOffset();

// set a cookie however you see fit, I like to use jQuery.cookie
$.cookie('timezone', offset);
```

Then, in application.rb or wherever you like:

```ruby
def browser_timezone
 return nil if cookies[:timezone].blank?
 `browser_timezone ||= begin
    min = cookies[:timezone].to_i
    TimeZone[(min + (-2 * min)).minutes]
  end
end
```

The cookie gives you minutes from GMT, but `ActiveSupport::TimeZone@
expects seconds from GMT.

Anyway, hopefully someone will find my pointing it out useful. It may
buckle under pressure (with daylight savings), but guessing and getting
it right 50% of the time is better than forcing user interaction.
Probably.

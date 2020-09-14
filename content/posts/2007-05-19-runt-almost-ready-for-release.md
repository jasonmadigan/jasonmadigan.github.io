---
title: Runt - almost ready for release
date: 2007-05-19T21:00:00
---

For the past few months at [college](http://www.wit.ie/) I've been
developing a web-based Rails application called Runt; Ruby Network Tool.
It's a small application which displays nicely formatted, up to the
second SNMP data from pretty much any device attached to your network.
If you're after specific data from specific devices, you simply load a
custom MIB for that device and Runt can get data from it. It features a
sort of tacked on ability to graph interface traffic for a given device
also, but it really doesn't feel all that at home in the application
itself at the moment for a variety of reasons. I'd like to expand upon
this a lot with later releases, but I find myself hindered with current
browser SVG support (at the moment RUNT uses Gruff to generate static
PNG graphs each pass).

The response from the demonstrations I've done over the past few months
has been encouraging but the codebase remains a bit too clumsy for my
liking to release it to the general public, at least not yet anyway. It
had been my first foray into the world of both Ruby and Rails so there's
a lot of cruft which needs reworking.

The version which I'll release will be v0.1, and I have a lot of other
functionality planned for v0.2. One of the biggest problems I
encountered while developing the application was finding myself
constantly hindered by the very nature of web-based applications - they
sort of need interaction before they'll do things. As a result, v0.2
will see a lot of functionality handled by a Ruby daemon (using
[BackgrounDRb](http://backgroundrb.rubyforge.org/)) such as graphing and
some cool alerting functionality through SMS should certain user
specified conditions arise like a device fails to respond to SNMP
requests.

One thing I will say about this learning experience is that I'm quickly
understanding why so many developers are using both Rails and Ruby for
development, regardless of of their rather sluggish performance in
comparison to say Django and Python. There's just something about blocks
like

```ruby
foo = [10, 20, 30, 40, 50]
foo.collect { |bar| bar/5*8 }
# => [16, 32, 48, 64, 80]
```

which make me consider how amazingly eloquent Ruby really is. I'm having
a blast with this stuff.

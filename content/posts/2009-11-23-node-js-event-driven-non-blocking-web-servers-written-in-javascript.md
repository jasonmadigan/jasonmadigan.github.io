---
title: Node.js - Event driven, non-blocking web servers written in JavaScript
date: 2009-11-23T21:00:00
---

**Update - 2015-09-11 while porting posts: This Node.js thing turned out to be a pretty big deal**

I've been fiddling with [Ryan Dahl's](http://github.com/ry) [Node.js](http://github.com/ry/node) event driven I/O framework for the V8 JavaScript VM over the past couple of days. It's probably the coolest piece of software I've come across in ages, and it really builds upon one of JavaScript's core strengths: event driven programming. If you've been looking to brush up on your event driven programming, it's seriously worth taking the time to play with. As part of his work on Node, Ryan has also released a seriously cool tiny [HTTP parser](http://github.com/ry/http-parser) in C (and used by Node). At 128 bytes per connection, it's perfect for use in any embedded environment which could do with some HTTP love, like the [Arduino](http://www.arduino.cc/).

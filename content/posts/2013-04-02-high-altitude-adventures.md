---
title: "High Altitude Adventures"
date: 2013-04-02T21:00:00
categories: hab
---

A few weeks ago, I spied a video on YouTube via Reddit - some guys had gotten together and put some cameras high up into the atmosphere (100,000ft, ~30km). I looked at it and thought it seemed like a good use of time. I got talking to [a friend of mine](http://blog.danielvagg.com/blog/) at work about the possibilites of launching something like this from Ireland. As it turned out, some people from launched successfully from Kerry [a few years back](https://www.youtube.com/watch?v=cqGoFAts1ag).

My initial plan was to launch something simple: a helium filled 800g balloon with some kind of cheap Android phone taking snaps every now and then. After watching lots of YouTube footage, and lots scouring through resources such the [UK High Altitude Society](http://ukhas.org.uk/), our plans evolved. Dan was keen for a more elaborate payload (it involves a fixed wing glider, some servos and a death spiral - I'm sure he'll tell you all about it). Eventually we settled on the idea of sending two payloads on one flight.

Initial Questions
-----------------

One of the first things that I wanted answering was whether or not it was actually legal to launch a high altitude balloon in Irish airspace. ~~As it turns out, the IAA have a pretty comprehensive document on the subject [here](https://www.iaa.ie/library_download.jsp?libraryID=213). I've yet to receive permission to launch from them, but I am hopeful.~~

*Update:* the IAA were very firm in giving a "No" to any such launch. Apparently they've only ever given permission for such launches to Met Éireann. Disappointing, but the CAA in the UK granted me permission to launch in Northern Ireland and were far more helpful.

Problems
--------
In the first few days, with some whiteboarding during lunches and late night conversations, we came up against some issues.

* Initially, Android devices looked like a good idea for simple flight computers. We had some ideas to develop some [FeedHenry](http://www.feedhenry.com) powered Apps to record and relay basic telemetry to a Node.js app - we'd use WebSockets to pipe data back in realtime. Knowing how flakey your average cellular data network is, I had my doubts this would work. A bigger problem, though, was that GSM was unlikely to work at anywhere near the altitudes we were interested in.

* We largely started out with no idea of how much this was likely to cost. Our guestimates of maybe €200 each were blown in the first week of parts acquisition (for me at least).

Lifting Gas
-----------
Helium looked like the best lifting gas, since it was inert and it's relatively cheap. Or it was - this isn't the case anymore. Poking around, we found many places offering balloon helium for party balloons. This, as it turned out, wasn't good enough for our purposes. Your average party balloon gas is only about 30% helium - the rest is usually air. We'd heard some estimates from others that 9cubic meters of industrial helium from BOC costs about €600 (including tank rental) - which is pretty extraordinary.

---
title: "High Altitude Adventures - Part 3"
date: 2013-07-04T21:00:00
categories: hab
---

A few weeks ago, I was mostly ready to launch. We'd bought an N30 cylinder of Helium from [Irish Party Supplies](http://www.irishpartysupplies.ie), containing 7.82m&sup3; of Helium - enough for roughly two launches of a standard sized 1000g balloon. Previously, I'd thought hydrogen would be a better choice, but considering it was a first launch we decided to play it safe (after having a gas seller painstakingly explain the various ways in which Hydrogen tanks can explode).

I'd also figured out the legals - the IAA didn't seem to be able to grant permission to anyone other that Met Eireann, so rather than labour the point I decided to launch from Northern Ireland instead. I'm still not entirely sure if launches here are legal or not, but the IAA, who regulate our skies didn't seem to be in a position to grant permission. The CAA in the UK have a procedure for weather balloon launches. So long as you heed their guidelines (which are very sensible), you have an excellent chance of being given permission. There also didn't appear to be any issue with me being an Irish resident.

Frequently checking the [CUSF Landing Predictor](http://habhub.org/predict/), I finally happened upon a good weekend at the end of June. The winds were calm and a predicted landing that wasn't in either the sea or a lake - all good! I contacted the CAA at short notice for permission to launch, and they were very helpful and prompt - I received permission documentation the following day.

![hab](/images/hab/9404557416.png)

My payload was complete - I'd bought a 42 inch Spherachute and a 1000g Hwoyee weather balloon from the good people at [Random Aerospace](http://randomaerospace.com/). I'd also sourced a small polystyrene payload box. For recording 1080p video, I finally settled on the excellent [Veho Muvi HD](http://www.amazon.co.uk/gp/product/B004AP9FSE/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B004AP9FSE&linkCode=as2&tag=jasomadi-21) - the video captured turned out better than I'd ever imagined.

![hab](/images/hab/9401843329.jpg)

The launch was a great success, with most things working as planned. The vertical radiator of the antenna broke off while we quickly tied off the balloon after filling.

![hab](/images/hab/9404599560.jpg)

![hab](/images/hab/9401831717.jpg)

I thought this would mean we wouldn't get any live telemetry during the flight. But as it turned out, because the balloon was high above the horizon with no obstacles in the way, the transmitter's weak 10mW signal was received clearly throughout by us in the car with a little handheld receiver as we chased the balloon.

While chasing, however, it become obvious that the GPS on board was not receiving updates, presumably because it had no lock. Although live telemetry was transmitted throughout the flight, without GPS data it wasn't particularly interesting - the altitude was stuck at 4km. I'm still not entirely sure what failed, but my guess is that the active GPS antenna I used wasn't working. The antenna was placed at the top of the payload box, which was quite close to the underbelly of the balloon. We'd tied things off quickly, so there was only about 6m between the payload box, the parachute and finally the balloon. I'd stowed a backup GPS tracker on board with GSM (redundancy!) which I'd hoped would give us a landing location in cse the primary tracker was no longer functional. I was able to call the GSM modem in the payload until sometime after the GPS lost it's lock (~4km up), which was higher than I thought.

Two and a half hours after launch, with the payload still transmitting the same 4km, I was able to call the payload once more - which meant it was descending and was close to landing. After about 30 minutes of frantic texting "where" over and over to the payload box, it finally responded with it's actual location. After landing, the GPS had regained a lock. The backup tracker refused to give us it's location throughout, presumably (I thought) because the payload box had tipped over. We raced towards the field where it had landed only to find that it had landed with some very curious cows. Eventually, after concocting a distraction, I managed to hop the gate and recover our payload - all in tact and still working.

![hab](/images/hab/9404572538.jpg)

![hab](/images/hab/space.png)


Source
------

Source for the Arduino Mega, Siemens TC35 serial GSM modem, RTTY transmission via the NTX2 is available [here](https://github.com/jasonmadigan/arduino-tracker)

South East Maker Space Presentation
-----------------------------------

The good folks at the South East Maker space ([@semakerspace](https://twitter.com/semakerspace)) invited me to talk about this recently. Slides are available [here](https://speakerdeck.com/jasonmadigan/high-altitude-adventures).

---
title: "High Altitude Adventures - Part 2"
date: 2013-04-24T21:20:00
categories: hab
---

Following on from my previous post, I'm going to go into a little more detail as to what we're planning and what I've built so far - hopefully it will be of interest!

The payload (or safeload as I'm now calling it) is now complete. It consists of:

* [An Arduino Mega 2560](http://www.amazon.co.uk/gp/product/B007TQ6TSK/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B007TQ6TSK&linkCode=as2&tag=jasomadi-21)
* [MTK3339 GPS](http://www.amazon.co.uk/gp/product/B008FZIZUE/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B008FZIZUE&linkCode=as2&tag=jasomadi-21)
* [Radiometrix NTX2](http://www.amazon.co.uk/gp/product/B0084DP4CY/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B0084DP4CY&linkCode=as2&tag=jasomadi-21) (434.650MHz @ 10mW)
* [Xexun TK102 GPS Tracker](http://www.amazon.co.uk/gp/product/B003XDQUQE/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B003XDQUQE&linkCode=as2&tag=jasomadi-21)
* [Veho Muvi HD 1080p Camcorder](http://www.amazon.co.uk/gp/product/B004AP9FSE/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B004AP9FSE&linkCode=as2&tag=jasomadi-21)
* [Siemens TC35 RS232 GSM modem](http://www.amazon.co.uk/gp/product/B006CHEUSI/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B006CHEUSI&linkCode=as2&tag=jasomadi-21)

![Payload](https://dl.dropboxusercontent.com/u/1336005/blog/payload.jpg)


It took a while to piece together the kind of parts I needed. I originally thought I could use an old Arduino Diecimila that I had lying around, along with a nice EM406-A GPS module that I'd used before. Unfortunately, the Diecimila only had 16KB of flash (2KB taken by the bootloader), and it looked like I'd need at least 32KB.

I bought an Uno and initally everything was going well - I had the EM406-A hooked up and was processing NMEA with relative ease, thanks to the great TinyGPS library. The NTX2 arrived a little later - this is when the problems began.

Software Serial Ports
---------------------

I planned to transmit telemetry throughout the flight with the NTX2. To do this, I was going to use RTTY (simple frequency shift keying) to encode telemetry and transmit. This worked fine in isolation, so I then hooked up the GPS again and tried to send some telemetry. There were weird errors in the RTTY transmission that I spent a few days tracking down late at night. The problem in the end turned out to be the SoftwareSerial port I was using. 

Uno's only come with one hardware UART, and it's wired into the USB port via FTDI. It was available to use, but it's fiddly and it'd mean swapping things around when it came to programming over USB (which I needed to do a lot of, since nothing worked!), so the EM-406A was hooked up via a software serial port. Arduino's SoftwareSerial is interrupt driven so NMEA data coming in on the SoftwareSerial port would trigger an interupt - RTTY transmissions are timing sensitive, so these interrupts interfered with transmission and introduced errors. 

Once I'd figured out was going wrong, disabling interrupts and having a "quiet period" for RTTY transmissions seemed to mostly fix things. Half way through uncovering the fix, however, I got frustrated and ordered an Arduino Mega (which has 4 hardware UARTs). When the Mega arrived, things got a lot simpler - lots of complicated timing logic could be removed.

RTTY
----

I'll post more about this later, but here's a short video of an RTTY transmission of some telemetry:

<iframe width="560" height="315" src="https://www.youtube.com/embed/v6Pq3bvAa8k" frameborder="0" allowfullscreen></iframe>

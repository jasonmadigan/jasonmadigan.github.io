---
title: iPhone JTAG Interface discovered
date: 2007-08-02T21:00:00
tags: 
  - iphone
  - hacking
---

George Hotz (geohot) over at #iphone.unlock on Undernet finally uncovered the iPhone Baseband's (S-Gold 2) [JTAG](http://en.wikipedia.org/wiki/Joint_Test_Action_Group) interface, which means an unlocking solution (albeit hardware based for the moment) is within reach. Geohot initally thought the JTAG interface may have been been located in the dock, but his search proved fruitless. Accessing these traces is incredibly difficult because the board has many layers and blind via's, and in the end could only be done by removing the S-Gold 2 from the baseband board altogether, which meant wrecking the board.

With this removed geohot found the TDI (Test Data In), TDO (Test Data Out), TCK (Test Clock), TMS (Test Mode Select) and TRST (Test ReSeT) connector pins quite easily. He now has to find a way of powering up the S-Gold 2 with these connectors attached to a JTAG interface, which is going to require a lot of precise soldering. It should result in a hardware (and eventually software) iPhone unlock. You can read more about his efforts [here](http://iphonejtag.blogspot.com/).

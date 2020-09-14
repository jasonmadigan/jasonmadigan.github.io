---
title: TurboSIM iPhone unlock - confirmed working
date: 2007-08-13T21:00:00
---

Two iPhone users have reported that their TurboSIMs have been
successfully used to unlock their iPhones. Both have warned that the
device is quite fragile and can be destroyed if forced into a SIM slot,
so be careful.

Ozbimmer, another member of the Hackint0sh forums
[posted](http://www.bladox.com/forum/viewtopic.php?p=2236#2236) to
confirm that his Turbo SIM works as expected. Zf\_ was also kind enough
to provide a quick guide:

-   First, your phone must be activated (with the AT&T SIM),
    jailbreaked, and with SSH and vim. Refer to previous tutorials to do
    that.
-   Download the port of [Bladox
    utilities](http://www.hackint0sh.org/forum/showpost.php?p=15335&postcount=16)
    on your computer, extract it on your computer (you need the binary
    file turbo-app)
-   Download AppleSaft 0.92 from Bladox (see the link on their forum,
    don't remember it), extract it on your computer (you need the .trb
    file)
-   Turn on your phone with Turbo SIM + AT&T subscription
-   Disable CommCenter - ssh to your phone, vim
    /System/Library/LaunchDaemons/com.apple.CommCenter.plist add:\
     @\
     <key>Disabled</key><true/>\
     @
-   If you don't like vim, you can do this modification on your desktop
    computer (iPhuc/iPhoneInterface getfile, modify the file, and
    putfile)
-   Reboot
-   Copy turbo-app to your phone (for example in /opt/bladox)
-   Copy applesaft.trb to your phone (for example in /tmp)
-   ssh to your phone, set the executable permission to turbo-app (chmod
    a+x /opt/bladox/turbo-app) and run it with /opt/bladox/turbo-app
    /tmp/applesaft.trb. It should take approximately 30 seconds and you
    shouldn't see any error. Please panic if you see one.
-   Reenable CommCenter - ssh to your phone, vim
    /System/Library/LaunchDaemons/com.apple.CommCenter.plist and delete
    the lines you added previously
-   Reboot
-   Go into Settings/Phone/SIM Applications/Apple Saft and choose Set
-   Turn off your phone
-   Turn on your phone with Turbo SIM + your subscription and test.


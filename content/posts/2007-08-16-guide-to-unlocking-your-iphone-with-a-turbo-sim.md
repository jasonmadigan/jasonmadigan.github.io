---
title: Guide to unlocking your iPhone with a Turbo SIM
date: 2007-08-16T21:00:00
---

Since receiving my Turbo SIM yesterday and successfully getting it to
work with O2 Ireland, I thought I'd write up a clear, easy to understand
guide outlining the process.

*Disclaimer: If you break something it's your own stupid fault
jerkface.*

What you will need
==================

An iPhone
---------

Your iPhone will need to be Jailbroken, have SSH installed and it will
need to have been activated using AT&T's ICCID (use iASign). If you
don't know what any of this means, do some reading. There are a million
zillion guides out there explaining the procedures for doing these
things. If, after reading, you still don't know what any of this means,
this method is not for you. Wait for a software based unlock.

A Turbo SIM - [Available here](http://www.bladox.com/shop.php?lang=en) (sold out at the time of writing)
--------------------------------------------------------------------------------------------------------

As explained in previous blog posts, this little device is sandwiched
between your carriers SIM and itself. It's capable of running small SIM
level applications, one of which, Applesaft, is capable of unlocking the
iPhone by exploiting a flaw in the iPhone's baseband. I'm not going to
explain how this works because anytime I do I get strange looks from
people as though I'd just asked them if they'd ever been abducted by
aliens. At the time of writing this, the poor small team at Bladox
churning these little devices out have become inundated with orders and
have had to temporarily close their online store.

Some software
-------------

[applesaft-0.92.tar.gz](http://www.mediafire.com/?5c3gvjc44zz) &
[turbo-cable-utils-iPhone-0.7.0-rev1.tar.gz](http://www.mediafire.com/?eoxhg0ynb5y)

Steps:
------

-   Extract the contents of turbo-cable-utils-iPhone-0.7.0-rev1.tar.gz
    to somewhere on your computer
-   Upload the contents of /bin-iPhone from the file you just unpacked
    to /bin on your iPhone (through SCP or SSHFS, whichever you prefer)
-   SSH into your iPhone
-   Run `cd /bin/`
-   Now you'll need to change the permissions for each of the binary
    applications which you just uploaded to `/bin/` using the command
    `chmod +x turbo-APPNAME`. There are 10 applications in total which
    you need to do this for.
-   Extract the contents of applesaft-0.92.tar.gz and copy the
    applesaft.trb file containted within to your `/bin/` folder on your
    iPhone the same as you uploaded the turbo cable utilities mentioned
    above. You can remove this and the `turbo-APPNAME` files later. Run
    `chmod 777 /bin/applesaft.trb` to give the file the permissions it
    needs.
-   Download and edit (or edit on the iPhone locally if you have
    something like VIM installed) the file `com.apple.CommCenter.plist`
    located in `/System/Library/LaunchDaemons/` on your iPhone.
-   Disable the commcenter by placing `<key>Disabled</key><true/>` after
    `<key>OnDemand</key><false/>` and copy the file back/save it.
-   Reboot the iPhone.
-   Now comes the tricky bit. Carefully **CAREFULLY** remove your Turbo
    SIM from its plastic casing. Seriously, Jesus Christ be careful. Oh
    god you're going to break it **WHAT ARE YOU DOING**.
-   Take your AT&T SIM card out of your iPhone using a paperclip and
    carefully trim it according the the printed instructions on the
    Turbo SIM's packaging. Don't be afraid to trim it really tight
    around the SIM's contacts for a snug fit.
-   Carefully sandwich the trimmed AT&T card with your Turbo SIM and
    place them both into the iPhone's SIM tray. You'll have to be gentle
    here as there's just barely enough clearance for both devices to fit
    snuggly into the SIM tray.
-   The carrier name area at the top left of the screen will continue to
    say "No Service", this is fine. If it says "No SIM" the contacts
    between your SIM and the Turbo SIM aren't properly seated, fiddle
    with it a bit to make sure they're square atop of one another.
-   SSH into your iPhone again and run the following command to ensure
    the iPhone can communicate properly with the Turbo SIM -
    "turbo-info". Assuming everything is correct, this command should
    return "OK" along with the serial of your Turbo SIM.
-   Now, lets install the applesaft application. Run the following:\
     `turbo-app /bin/applesaft.trb`\
    If all goes well you should receive an "OK" after some initial
    messages about the modem being initialised.
-   Alter the `com.apple.CommCenter.plist`file we edited above and
    remove the line we added `<key>Disabled</key><true/>` and reboot.
-   On your iPhone, go to Settings\>Phone\>SIM Applications\>Apple Saft
    and press "SET". A prompt should indicate that the IMSI and ICCID of
    the AT&T SIM has been read and recorded successfully.
-   Now, remove the Turbo SIM and AT&T SIM.
-   Trim your carriers SIM card just like the AT&T one and insert the
    sandwiched pair into the iPhone.
-   Reboot the iPhone.
-   All going well, your iPhone should now properly register on your
    carriers network and everything should pretty much work straight
    away. To get EDGE/GPRS working, alter the settings in
    Settings\>General\>EDGE to use your carriers APN/Username/Password.
-   Pat yourself on the back.


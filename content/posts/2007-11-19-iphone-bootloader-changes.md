---
title: iPhone bootloader changes
date: 2007-11-19T21:00:00
---

For anyone thinking of purchasing an iPhone in the near future, be aware
that Apple is now shipping iPhones with an updated bootloader
(4.6\_M3S2) which has seen the a number of unlocking avenues closed.

All iPhone's shipped after week 45 are very likely to have 1.1.2
pre-installed with this new bootloader - you can check to see the week
of manufacture by looking at the devices serial number (e.g.xxx45xxxxxx
means it was manufactured during week 45) or by issuing the following
command within a shell:

```bash
~~sh-3.2\# ./bbupdater~~v
Resetting target…
pinging the baseband…
issuing +xgendata…
firmware: DEV\_ICE\_MODEM\_04.02.13\_G
eep version: EEP\_VERSION:208
eep revision: EEP\_REVISION:1
bootloader: BOOTLOADER\_VERSION:4.6\_M3S2
Done
```

Thankfully (obviously) Apple has not seen fit to include a bootloader
update with their firmware releases, so iphonesimfree users with their
zero'd seczones should be okay for the foreseeable future. Updating the
bootloader would create all kinds of headaches for all end users -
upgrading a bootloader is always a risky proposition.

---
title: Why you shouldn't place your trust in someone else's code
date: 2007-06-03T21:00:00
---

About two years ago I used to regularly play World of Warcraft;
something which I'm not particularly proud of. While doing so I managed
and maintained a small community site for our guild. Our guild was
comprised of several members of the somethingawful forums and, as such,
our humour tended to be a little more odd than most. If you've laughed
at something morally bankrupt on the internet, chances are it originated
on the forums there. After a few months, we formed a chilled out
raidgroup and started regularly raiding dungeons. This meant we'd need
some system for distributing loot amongst ourselves lest we find
ourselves in a position where people's
[poopsockery](http://en.wikipedia.org/wiki/Poopsocking) go unrewarded.
We settled on a system called DKP, or Dragon Kill Points. Basically when
you attend raids you bid on loot, and your bid is divided amongst all
those present such that people who attend more get more loot. To
implement this, we settled with a popular PHP script called
[EQDKP](http://www.eqdkp.com) to manage our points.

Anyway, I installed EQDKP and because I was busy at the time and because
I'm pretty lazy, I never really got a chance to read around the
applications code. Pretty much everyone else is using this so I'm sure
it's reasonably secure, right?

I quit playing World of Warcraft last August after realising that game
was a complete sack of shit and spending so much time playing it was
completely stupid. I continued to maintain the guild's website in the
meantime before eventually passing it on to a fellow web developer
guild-member a week ago. While rsync'ing, out of boredom, I decided to
peruse EQDKP's source. I started to become very nervous. This code had
been running for almost a year on my box?

```php
<?php
// First things first - a small amount of security
// This script is *so* hackable as to not be funny
// The possible benefit (IMO) outweighs the possible security
// issue with referrer hacking tho
// Check that the visitor's referrer was a page within your own site.
// Copyright 2001 Tim Green
// http://www.dwfaq.com/snippets/snippet_details.asp?SnipID=51

$tg__ServerName=explode(".",getenv("SERVER_NAME"));
$tg__server=$tg__ServerName[count($tg__ServerName)-2].".".$tg__ServerName[count($tg__ServerName)-1];
$tg__Referred = getenv("HTTP_REFERER");

// Get host name from URL
preg_match("/^(http://)?([^/]+)/i", $tg__Referred, $tg__RefHost);
$tg__Host = $tg__RefHost[2];
preg_match("/[^./]+.[^./]+$/", $tg__Host, $tg__RefHost);
if ($tg__RefHost[0] != $tg__server) {
    // Change the location to your desired page
    header("Location: ./../../viewnews.php");
}

// Now start the "stuff" 
?>
```

> This script is **so** hackable as to not be funny. The possible
> benefit (IMO) outweighs the possible security issue with referrer
> hacking tho.

Oh dear.

So, to access EQDKP's database backup functionality within it's admin
panel all we have to do is point a browser to:

`http://myguild.com/eqdkp/admin/backup`

And spoof HTTP request referral to read:

`http://myguild.com/eqdkp/admin/`

That's it, you've now got full access to EQDKP's database, we're even
presented with a nice interface to dump the database's contents.

As if this isn't stupid enough, EQDKP doesn't salt its user's
passwords prior to hashing them. With this in mind we can fire up
whichever web version of RainbowCrack is currently not serving up 404's
and we have the user's plaintext password. We could also dump the
database and change the administrators password to one of our choosing
by simply replacing the hash (since it's not salted). People being
people, we tend to use the same password for pretty much everything. Our
email, PayPal, banking details etc., all compromised by one shitty
script. Pretty scary, eh?

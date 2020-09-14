---
title: Runt - SVG & Rails
date: 2007-05-28T21:00:00
---

While developing Runt over the past few months it became obvious mid-way
through development that the integration of graphing was somewhat of an
afterthought. That's okay though because we're agile, right?

Graphing SNMP data in Rails applications (or any other application for
that matter) is difficult for a number of reasons:

-   What the hell do I graph?
    -   SNMP data is so varied in scope that we need to narrow our scope
        in order to graph something useful. We don't want to graph
        **sysName** against **sysDescr** because that's stupid and
        completely useless.
    -   Graphs obviously need need be composed of numerical data, so any
        SNMP data composed of strings is likely going to be useless.

-   Right, so what kind of data types should we be looking at (assuming
    we're working with protocol version 2c)?
    -   Integer32/Integer
        (Enumerated)/Unsigned32/Gauge32/Counter32/TimeTicks/Opaque/Bits

With these data types in mind, our scope is still way too vague for us
to be able to graph any meaningful data. With a deadline looming, I made
the decision to limit the scope of graphing in Runt to just bandwidth,
something which most SNMP graphing applications out there focus on
([MRTG](http://oss.oetiker.ch/mrtg/) for example). Having made my
decision I was then faced with some interesting decisions regarding
graphing. Initially I wanted graphing to be as sexy as that found in the
[Tomato](http://www.polarcloud.com/tomato/) firmware installed on my
WRT54GL router.

Tomato generates its graphs in between AJAX requests and renders them to
the user using
[SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics).
Unfortunately, browser SVG support is patchy for Intel Mac users with
Safari 2.0.4 (even though SVG support landed in WebKit landed
<a href="http://webkit.org/blog/?p=35">over two years ago</a>). Adobe
have offered a plugin for SVG support in Safari (which is going to be
unsupported next year), but only for users running Safari on PowerPC
Macs. As an Intel user you could of course run Safari under Rosetta to
enable the plugin to function but jesus don't. Thankfully SVG support
will finally find its way into Safari 3.0 in Leopard, but that's several
months away. IE6/7 users enjoy SVG support through the same Adobe
plugin, while Gecko based browser users see SVG built-in.

With this in mind, and due to the fact I'm a selfish jerk who uses
Safari, I decided against using SVG in Runt, at least for the time
being. My options for graphing in Rails boiled down to three contenders:

-   [Gruff](http://nubyonrails.com/pages/gruff) - pretty graphs that are
    rendered as PNGs. Rails plugin.
-   [Scruffy](http://scruffy.rubyforge.org/) - - pretty graphs,
    internally rendered using SVG and it can spit out your graphs in
    pretty much any format imaginable. Unfortunately it hasn't been
    updated in over 9 months.
-   [ZiYa](http://ziya.liquidrail.com/) - pretty Flash graphs. Flash,
    ugh.

I eventually rolled with Gruff since I found it the easiest to get to
grips with and because it somehow **felt** more Rails like than the
others. I was seriously considering ZiYA for several weeks but
considering how much I've come to hate almost all implementations of
Flash "hay guys lets totally offload the rendering of this website to
some proprietary plugin! This is a great idea, right guys! Guys?!" I
decided it was best to roll with something I could stomach myself using.
Unfortunately, this meant that interactivity with the graph was going to
be seriously limited as Gruff was just going to throw rendered PNGs at a
user with a rather horrible rendering delay between AJAX requests. This
is something that has bothered me ever since I chose to use Gruff, but
what's done is done.

The next iteration of Runt will see me revisit the idea of using SVG
rendering because it's sexy as hell and because, for the time being at
least, I've begun using Firefox 2.0 regularly once more.

---
title: Meteor GPRS/EDGE fix
date: 2007-10-07T21:00:00
---

I should probably stop posting about the iPhone, but hey, what can I say
- this little device has captured my heart.

To get GPRS/EDGE working with Meteor and your iPhone is pretty simple,
all we need is a proxy auto-config file:

```javascript
function FindProxyForURL(url, host) {
 if (isInNet(myIpAddress(), "10.0.0.0", "255.0.0.0")) {
 return "PROXY 10.85.85.85:8799";
 } else {
 return "DIRECT";
 }
}
```

Save this as `proxy.pac` and pop this into `/private/var/root`. Next add
the following key to
`private/var/root/Library/Preferences/SystemConfiguration/preferences.plist`:

```xml
<key>Proxies</key>
<dict>
 <key>ProxyAutoConfigEnable</key>
 <integer>1</integer>
 <key>ProxyAutoConfigURLString</key>
 <string>file:///private/var/root/proxy.pac</string>
</dict>
```

And that should be it. I haven't actually tested this yet, so if some
kind soul would be good enough to that would be great. Any HTTP traffic
should now get routed over Meteor's proxy. Mail probably won't work,
I'll try to fix this when I get my hands on a Meteor SIM.

---
title: Symbolic links are pretty cool - read access to the 1.1.1 filesystem
date: 2007-10-05T21:00:00
---

On 1.02:

```bash
cd /var/root
mv Media backup
ln -s / Media
```

Restore to 1.1.1, run the latest version of iphuc. Media is now / for
1.1.1.

'sup MobileStore.app. Now to pop in kmem and get read/write access.

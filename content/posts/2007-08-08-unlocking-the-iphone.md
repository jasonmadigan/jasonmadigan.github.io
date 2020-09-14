---
title: Unlocking the iPhone
date: 2007-08-08T21:00:00
---

There are two available solutions for unlocking the iPhone at the
moment, and both hinge upon a "flaw" in the iPhone's baseband. All
shipped iPhones are locked with a PN (personalized network) lock to
at&t. The iPhone, upon startup, enforces this PN lock by reading the
included at&t SIM card's
[IMSI](http://en.wikipedia.org/wiki/International_Mobile_Subscriber_Identity)
two times initially at startup to ensure the IMSI is that of at&t. The
third and subsequent reads of the IMSI during the normal operation of
the iPhone is not checked to ensure it is that of at&t.

The two available unlocking solutions both exploit this to use SIM cards
from providers other than at&t. The first method involves SIM card
cloning, which is very much illegal in most countries. The method sees a
the KI (the "secret" ciphering and authentication key embedded into the
SIM) extracted from an old COMP128 V1 SIM card (these are rare to find
distributed from 2002 onwards). The KI can only be extracted from these
old SIM cards, and not the modern V2/V3 cards available today. The KI
and IMSI from this old SIM card, along with the IMSI of the iPhone's
at&at card are combined and written to a blank SIM card (SilverCard)
using a SIM card writer. Some additional programming is done to the
blank card's SIM to return the at&t IMSI the first two reads, and the V1
cards IMSI for any subsequent requests. This method works, but is
frought with all sorts of legality issues (not to mention the fact that
finding old V1 SIM cards is pretty difficult anyway) and so is less than
ideal.

A second unlocking solution is much more promising and is likely to
attract a lot of attention over the next few weeks. It involves the use
of a piece of hardware from [Bladox](http://www.bladox.com/) called a
Turbo SIM. This nifty thin little device sits between your original SIM
card and the SIM reader in your iPhone. It's capable of running small
SIM applications and can be used to intercept incoming IMSI requests (or
any SIM requests for that matter), process them, and produce output. Use
of such a device is probably completely legal, since the original SIM
card is not cloned. It will also work perfectly with V2/V3 SIM cards.
It's only purpose (in the case of unlocking the iPhone) is to get by the
"good guy, bad guy" IMSI check the phone performs at boot to provide the
iPhone with the at&t IMSI it requires at startup. Thereafter, the device
relinquishes control back to the original SIM card for any further SIM
requests, including network registration. I've ordered one and by the
time it arrives in 2 or so weeks there should be a great deal of hype
surrounding the device. Two applications designed to run on the device
for the purpose of fooling the iPhone have already been released, here's
the source of the first one:

```c
/*
 * iPhone baseband SIM lock 0wnage PoC
 *
 * History:
 * 0.92 - User Interface, ICCID/IMSI are read from a card and
      then used with another
 * 0.91 - some fixes, PROC_8_CONFIG_INIT_BOOSTER for speedy init of ICCID file,
 *      needs bladox turbo kernel >=1.2.7
 * 0.9 - original version
 *
 * Compile, load on your leet Bladox gear
 * disable your subscription PIN and enjoy :p
 *
 * Special thanks to the baseband development team
 * It wouldn't have been so easy without you :)
 *
 * (c) 2007, collective iPhone development effort
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/

#include <config.h>
#include <turbo/turbo.h>

#include <stdlib.h>
#include <string.h>

#define VERSION_A    0
#define VERSION_B    92

/* *INDENT-OFF* */

static lc_char PROGMEM lc_Show[]={
        LC_EN("Show")
        LC_END
};

static lc_char PROGMEM lc_Set[]={
        LC_EN("Set")
        LC_END
};

static lc_char PROGMEM lc_WasSet[]={
        LC_EN("Following was set: ")
        LC_END
};


static lc_char PROGMEM lc_Version[]={
        LC_EN("Version")
        LC_END
};

static lc_char PROGMEM lc_AppleSaft[]={
        LC_EN("Apple Saft")
        LC_END
};

static lc_char PROGMEM lc_IMSI[]={
        LC_EN("IMSI: ")
        LC_END
};

static lc_char PROGMEM lc_ICCID[]={
        LC_EN("ICCID: ")
        LC_END
};

/* *INDENT-ON* */

#define EF_IMSI 0x6F07
#define EF_ICCID 0x2FE2

u8 PROGMEM ef_imsi_path[] = { 0x3F, 0x00, 0x7F, 0x20, 0x6F, 0x07 };
u8 PROGMEM ef_iccid_path[] = { 0x3F, 0x00, 0x2F, 0xE2 };

#define IMSI_SIZE 9
#define IMSI_RESPONSE_SIZE 15

u8 counter;
u8 *imsi;
u8 *imsi_response;
u8 file[2];

u8 *tmp_imsi;
u8 *tmp_iccid;

typedef struct _Pers_mem
{
  u8 on;
  u8 imsi[0x09];
  u8 iccid[0x0a];
}
Pers_mem;

Pers_mem *pers_mem = NULL;

void handle_sim_file (File_apdu_data * fa)
{
  u8 i;

  if (fa->ef == EF_ICCID && fa->ins == ME_CMD_READ_BINARY)
  {
    if (rb (&pers_mem->on))
    {
      dbsp ("FAKE_ICCID\n");
      //memcpy (fa->data, _att_iccid, sizeof (_att_iccid));
      memcpy (fa->data, &pers_mem->iccid[0], 0x0a);
    }
    else
    {
      dbsp ("REAL_ICCID\n");
      sim (fa->ins, fa->p1, fa->p2, fa->p3, fa->data);
    }

    fa->data[fa->p3] = 0x90;
    fa->data[fa->p3 + 1] = 0x00;
  }
  else if (fa->ef == EF_IMSI && fa->ins == ME_CMD_READ_BINARY)
  {
    sim (fa->ins, fa->p1, fa->p2, fa->p3, fa->data);
    switch (counter)
    {
      case 0:
    dbsp ("REAL_IMSI_0\n");
    /* learn and retransmit */
//        low_level_imsi_select ();
//        sim (0xB0, 0x00, 0x00, 0x09, imsi);   /* READ BINARY */
//        memcpy (fa->data, imsi, IMSI_SIZE);
    fa->data[fa->p3] = 0x90;
    fa->data[fa->p3 + 1] = 0x00;
    counter++;
    break;
      case 1:
    /* spoof */
    if (rb (&pers_mem->on))
    {
      dbsp ("FAKE_IMSI_1\n");
//        memcpy (fa->data, _att_imsi, sizeof (_att_imsi));
      memcpy (fa->data, &pers_mem->imsi[0], 0x09);
    }
    else
    {
      dbsp ("REAL_IMSI_1\n");
    }
    fa->data[fa->p3] = 0x90;
    fa->data[fa->p3 + 1] = 0x00;
    counter++;
    break;
      case 2:
    counter++;
    /* no break intended here */
      default:
    dbsp ("REAL_IMSI_2+\n");
    /* play nice */
//        memcpy (fa->data, imsi, IMSI_SIZE);
    sim (fa->ins, fa->p1, fa->p2, fa->p3, fa->data);
    fa->data[fa->p3] = 0x90;
    fa->data[fa->p3 + 1] = 0x00;
    }
  }
  else
    sim (fa->ins, fa->p1, fa->p2, fa->p3, fa->data);
}

void get_files ()
{
  u8 path[6];

  memcpy (path, ef_imsi_path, 6);
  select (path, 3);
  sim (ME_CMD_READ_BINARY, 0x00, 0x00, 0x09, tmp_imsi);
  select (0, 0);

  memcpy (path, ef_iccid_path, 4);
  select (path, 2);
  sim (ME_CMD_READ_BINARY, 0x00, 0x00, 0x0a, tmp_iccid);
  select (0, 0);
}

u8 saft_set (SCtx * ctx, u8 action)
{
  if (action == APP_ENTER)
  {
    u8 *buf = buf_B ();
    u8 *r = buf;
    u8 i;

    get_files ();

    memcpy (&pers_mem->imsi[0], tmp_imsi, 9);
    memcpy (&pers_mem->iccid[0], tmp_iccid, 0x0a);
    wb (&pers_mem->on, 1);

    r = sprints (r, locale (lc_WasSet));
    r = sprintc (r, '\n');

    r = sprints (r, locale (lc_IMSI));
    for (i = 0; i < 0x09; i++)
    {
      r = sprintch (r, rb (&pers_mem->imsi[i]));
      r = sprintc (r, ' ');
    }

    r = sprints (r, locale (lc_ICCID));
    for (i = 0; i < 0x0a; i++)
    {
      r = sprintch (r, rb (&pers_mem->iccid[i]));
      r = sprintc (r, ' ');
    }
    r = sprintc (r, '\n');

    r = sprintc (r, '\0');
    i = display_text (buf, NULL);
    if (i != APP_END)
      return APP_BACK;
    return i;

    return APP_BACK;
  }
  return APP_OK;
}

u8 saft_show (SCtx * ctx, u8 action)
{
  if (action == APP_ENTER)
  {
    u8 *buf = buf_B ();
    u8 *r = buf;
    u8 i;

    get_files ();

    r = sprints (r, locale (lc_IMSI));
    for (i = 0; i < 0x09; i++)
    {
      r = sprintch (r, tmp_imsi[i]);
      r = sprintc (r, ' ');
    }

    r = sprints (r, locale (lc_ICCID));
    for (i = 0; i < 0x0a; i++)
    {
      r = sprintch (r, tmp_iccid[i]);
      r = sprintc (r, ' ');
    }
    r = sprintc (r, '\n');

    r = sprintc (r, '\0');
    i = display_text (buf, NULL);
    if (i != APP_END)
      return APP_BACK;
    return i;
  }
  return APP_OK;
}

u8 saft_version (SCtx * ctx, u8 action)
{
  if (action == APP_ENTER)
  {
    u8 *buf = buf_B ();
    u8 *r = buf;
    u8 i;

    r = sprints (r, locale (lc_AppleSaft));
    r = sprintc (r, ' ');

    r = sprinti (r, VERSION_A);
    r = sprintc (r, '.');
    r = sprinti (r, VERSION_B);
    r = sprintc (r, '\n');

    r = sprintc (r, '\0');
    i = display_text (buf, NULL);
    if (i != APP_END)
      return APP_BACK;
    return i;
  }
  return APP_OK;
}

SNodeP saft_n = { lc_AppleSaft, NULL };
SNodeP saft_set_n = { lc_Set, saft_set };
SNodeP saft_show_n = { lc_Show, saft_show };
SNodeP saft_version_n = { lc_Version, saft_version };

/* *INDENT-OFF* */

SEdgeP saft_edges_p[] = {
  {&saft_n, &saft_show_n},
  {&saft_n, &saft_set_n},
  {&saft_n, &saft_version_n},
  NULL
};

/* *INDENT-ON* */

void action_menu (Menu_selection_data * x)
{
  SCtx *c;

  c = spider_init ();
  c->eP = &saft_edges_p;
  c->n = &saft_n;
  spider (c);
}

void turbo_handler (u8 action, void *data)
{
  switch (action)
  {
    case ACTION_APP_REGISTER:
      {
    Pers_mem *p = emalloc (sizeof (Pers_mem));

    pers_mem = p;
    wb (&p->on, 0);
    reg_app_data (p);

    set_proc_8 (PROC_8_CONFIG_INIT_BOOSTER, 1);
      }
      break;
    case ACTION_APP_UNREGISTER:
      {
    Pers_mem *p = app_data ();

    efree (p);
      }
      break;
    case ACTION_APP_INIT:
      dbsp ("APP_INIT\n");
      counter = 0;
      pers_mem = app_data ();

      tmp_imsi = malloc (0x09);
      tmp_iccid = malloc (0x0a);

      imsi = malloc (IMSI_SIZE);
      imsi_response = malloc (IMSI_RESPONSE_SIZE);
      reg_file (ef_imsi_path, 3);
      reg_file (ef_iccid_path, 2);
      break;
    case ACTION_FILE_APDU:
      handle_sim_file (data);
      break;
    case ACTION_INSERT_MENU:
      insert_menu (locale (lc_AppleSaft));
      break;
    case ACTION_MENU_SELECTION:
      stk_thread (action_menu, NULL);
      break;
    default:
      break;
  }
}
```

As you can see, it's pretty simple. Over the coming days we'll probably
see a native iPhone application for writing applications such as the one
above to the Turbo SIM. An updated application provided by the kind
folks from Bladox is up at their forums
[here](http://www.bladox.com/forum/viewtopic.php?t=542&postdays=0&postorder=asc&start=15).
Happy hacking.

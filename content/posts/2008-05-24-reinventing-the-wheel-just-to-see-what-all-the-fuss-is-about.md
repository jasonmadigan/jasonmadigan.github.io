---
title: Reinventing the wheel, just to see what all the fuss is about.
date: 2008-05-24T21:00:00
---

I've been amassing a small army of broken arduinos over the past two
months, but now I have **something** to show for it - the bones of a
working (but altogether bulky) GPS tracker. The code I used seems kind
of nasty to me, mostly because the bit-banging used for serial
communication to try to ensure no data is missed in transition. The
Arduino IDE is okay I guess (for a Java app), but if you like Ruby you
may want to check out [RAD](http://rad.rubyforge.org/). Looks like RAD
only works with version 10 of the arduino SDK right now though.

In terms of kit hooked up, we've got an [EM-406A (GPS
Module)](http://www.sparkfun.com/commerce/product_info.php?products_id=465)
& an [Arduino Mini](http://www.arduino.cc/) along with a USB to serial
header. I need to buy a EEPROM for storage, or possibly some kind of
microSD reader. Borrowing some code from
[here](http://www.railsonwave.com/railsonwave/2007/7/4/gps-and-google-map-in)
we can parse NMEA to take a look at where you are with Google Maps.

```
#define bit4800Delay 200 //1 bit per 0.2 ms
#define halfBit4800Delay 100

byte rx = 8; //Connect to EM-406A's TX
byte tx = 9; //Connect to EM-406A's RX
char dataformat[7] = "$GPGGA"; //GGA
char messageline[80] = "";
int i = 0;
char latitude[10];
char longitude[11];

void setup() {
 pinMode(rx,INPUT);
 pinMode(tx,OUTPUT);
 digitalWrite(tx,HIGH); // Needs to be pulled high before the EM-406A
will return data
 digitalWrite(13,HIGH); // Debugging LED
 Serial.begin(9600); // Echo EM-406A output through serial
}

char SWread()
{
 byte val = 0;
 //Wait for start bit (0)
 while(digitalRead(rx)  HIGH); 

  if (digitalRead(rx)  LOW) {
 delayMicroseconds(halfBit4800Delay);

for (int offset = 0; offset < 8; offset**) {
 delayMicroseconds;
 val |= digitalRead << offset;
 }

 delayMicroseconds;

 // Bitbanging
 if
 return val-128;
 else
 return val;
 }
}

void char2string {
 i = 0;
 messageline[0] = SWread;
 if {
 i**;
 messageline[i] = SWread();

while(messageline[i] != 13 & i<80) {
 i++;
 messageline[i] = SWread();
 }

messageline[i+1] = '0';
 }
}

void loop() {
 char2string();
 if (strncmp(messageline, dataformat, 6) == 0 & i>4) {
   Serial.println(messageline);
 }
}
```

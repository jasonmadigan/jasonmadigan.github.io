---
title: "Training an Alexa wake word for the Voice PE"
date: 2026-11-01T10:00:00
categories: homeassistant
description: "A microWakeWord Alexa model trained on voices split evenly between women and men, because the old one barely heard my wife."
---

We have four [Voice PEs](/posts/2025-01-01-home-assistant-voice-shopping-lists/) around the house, all set up to answer to "Alexa". The Voice PE doesn't ship with an Alexa wake word, for reasons I assume involve lawyers, so we'd been running Kevin Ahrendt's microWakeWord `alexa` model (the v2 one from ESPHome's [micro-wake-word-models](https://github.com/esphome/micro-wake-word-models) repo). It worked fine for me. It barely worked at all for my wife, and wasn't much use with women's voices in general.

You do not want to be the person who fills the house with smart speakers that only listen to you.

In fairness to Kevin's model, some of this was self-inflicted. At some point I'd cranked the probability cutoff up to 0.97 with a sliding window of 7 (up from the defaults of 0.90 and 5) to stop it chiming in during the telly, which made it deaf as a post to anyone who wasn't me. Rather than spend another evening tweaking two numbers in a YAML file, I did the sensible thing and spent two and a half hours on an RTX 5070 Ti training a new model from scratch.

The training data is all synthetic speech generated with [Piper](https://github.com/rhasspy/piper), which has the main advantage of being willing to say "Alexa" fifty thousand times on a Sunday without asking why. I stuck to voice datasets that bother to write down each speaker's gender and accent, then split the clips dead even between men and women across Irish, Scottish, English, Welsh, North American, Australian, New Zealand, South African, South Asian, and non-native English accents. Once generated, the clips get roughed up with background noise and simulated room acoustics so they sound less like a booth and more like someone shouting from the kitchen.

It also needs to learn what *isn't* "Alexa", so a pile of near-misses like "Alexis", "a Lexus", "Alec's car", and "relax a bit" go in as negative examples, alongside hours of ordinary speech and household noise.

To test it properly, whole speakers are held out of the training run so the model is never graded on a voice it's already met. The evaluation script copies the exact sliding-window detection logic out of the ESPHome source code, so the test numbers reflect what the plastic puck on the shelf will actually do.

Here is how often the old setup and the new model caught "Alexa" from held-out voices:

| | Old model (at our settings) | New model |
|-|-|-|
| Irish women, across the room | 24% | 78% |
| All groups, on average | 71% | 92% |
| Worst-performing group | 43% | 72% |

All of those benchmarks are on synthetic test voices, though, and none of them live here. In actual tests around the house, it went 4 for 4 for me out to seven metres, and 4 for 5 for my wife between two and five metres. It's running on all four speakers now.

The trained model, the Voice PE config, and the training harness are all up at [github.com/jasonmadigan/alexa-microwakeword](https://github.com/jasonmadigan/alexa-microwakeword). Huge thanks to Kevin Ahrendt for microWakeWord, which does all the actual work, and to the Piper project for the voices.

*(For the avoidance of doubt: "Alexa" is an Amazon trademark, and this is an unofficial hobby project with no connection to them whatsoever, which I suspect suits us both.)*

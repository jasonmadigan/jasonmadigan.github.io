---
title: Projects
layout: projects
heading: On the workbench.
description: Tracefinity, Snag, docket, Home Assistant integrations, and other projects by Jason Madigan.
projects:
  - name: Tracefinity
    featured: true
    category: 3D printing · Open source
    description: Turn photos of your tools into custom Gridfinity bins. Trace the outlines, arrange a layout, and export STL or 3MF files ready for printing.
    image: /images/projects/tracefinity-bin-preview.png
    image_alt: Tracefinity's 3D preview of a storage bin, with a pocket cut to the traced outline of a pair of snips.
    image_width: 1088
    image_height: 680
    links:
      - label: Try Tracefinity
        url: https://tracefinity.net
      - label: GitHub
        url: https://github.com/tracefinity/tracefinity
  - name: Snag
    category: Mac app · 2026
    description: A fast, native file manager for the Mac. It splits each transfer into parallel threads, retries the chunks that fail, and picks up where it left off, even after a restart.
    image: /images/projects/snag-transfers.png
    image_alt: Snag downloading a Fedora ISO at 67.3 MB/s with chunk 3 retrying, above a completed Alpine download.
    image_width: 440
    image_height: 275
    links:
      - label: About Snag
        url: /snag/
      - label: Mac App Store
        url: https://apps.apple.com/ie/app/snag-file-manager/id6761379072
  - name: docket
    category: Developer tool · Open source
    description: Every open pull request and issue you’re involved in, live in a terminal or a browser tab, with CI, what’s left before merge, and how long since a person last touched each one.
    image: /images/projects/docket-tui.png
    image_alt: docket in a terminal, showing what's left before a pull request can merge, from failing CI checks to changes requested and unresolved threads.
    image_width: 610
    image_height: 381
    links:
      - label: GitHub
        url: https://github.com/jasonmadigan/docket
  - name: Home Assistant integrations
    category: Home automation · Open source
    symbol: "~/"
    description: An unofficial integration to arm, disarm and monitor HKC alarm panels, and a sensor for ESB Networks outages, faults and restorations near you.
    links:
      - label: HKC alarm
        url: https://github.com/jasonmadigan/ha-hkc
      - label: ESB faults
        url: https://github.com/jasonmadigan/ha-esb-faults
  - name: Arduino balloon tracker
    category: Hardware experiment · 2013
    symbol: "{…}"
    description: An Arduino Mega flight computer with a GSM modem and radio telemetry, built for a high altitude balloon.
    links:
      - label: Explore the source
        url: https://github.com/jasonmadigan/arduino-tracker
  - name: High Altitude Adventures
    category: From the field · 2013
    description: A homemade payload, a helium balloon, and a camera with a rather good view. The launch, the chase, and the recovery.
    image: /images/hab/space.png
    image_alt: Clouds and the curve of the Earth, photographed from the balloon payload.
    image_width: 1431
    image_height: 794
    links:
      - label: Read the flight log
        url: /posts/2013-07-04-high-altitude-adventures-part-3/
      - label: Source code
        url: https://github.com/jasonmadigan/arduino-tracker
work:
  heading: At work
  intro: "I work at Red Hat on [Kuadrant](https://kuadrant.io), gateway policies for Kubernetes. Some of what I've worked on there:"
  items:
    - name: Kuadrant console plugin
      url: https://github.com/Kuadrant/kuadrant-console-plugin
      description: Kuadrant in the OKD and OpenShift web console.
    - name: Kuadrant Backstage plugin
      url: https://github.com/Kuadrant/kuadrant-backstage-plugin
      description: Manage Kuadrant policies and APIs from Backstage and Red Hat Developer Hub.
    - name: MCP Gateway
      url: https://github.com/Kuadrant/mcp-gateway
      description: An Envoy-based gateway for MCP servers, with Istio integration and policies for authentication, authorisation and rate limiting.
    - name: kuadrant.io
      url: https://kuadrant.io
      description: The project's website and documentation.
    - name: oinc
      url: https://github.com/jasonmadigan/oinc
      description: OKD in a container, a single-node cluster with the OpenShift console for local console plugin work.
---

A few things I've made, from useful software to things sent into the sky.

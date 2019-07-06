# Call For Code 2019 - Novice Coders

### Project Name

Project Simbioasis

![Project Logo](https://novice-coders.github.io/CFC2019/img/logo.png)

### Project Description

Helps emergency response teams to identify calamity-hit survivors in a remote area without internet access. 

The target-user would ideally install an app in their android smartphone. The app would enable the target-users to register themselves with some basic info. The user information is saved in the SIMBIoasis system.

This prototype employs a multi-platform system consisting of two IOT devices, a node server with cloudant database, a resource and notification management interface written in Angular, and an (optional) Android app.

The workflow essentially starts from one deployable IOT device, the spotter that leverages a SX-1278 LoRa module sitting on a Raspberry Pi 3. The Spotter is designed to scan available hotspots in its vicinity and dispatch consolidated data via Long Range Radio signal to the other IOT device which would then communicate with the server to make lives easier for the first responders and rescuer team.

The SIMBIoasis system is hosted in IBM Cloud with its server setup using NodeJS and leveraging Cloudant database. It provides APIs to communicate with the IOT devices and Admin front-ends.

The spotter is envisaged to be deployed in a remote area, where network gets disrupted or becomes ineffective. The spotter collects the survivors' information by scanning all available hotspots in its vicinity. It parses the hotspot names to identify the survivors' requirements and sends the consolidated data to the second IOT device.

The Receiver is second IOT device that is responsible for receiving the radio signal transmitted by the spotter. It is envisaged to be stationed in an area with proper network connectivity. Its LoRa module receives the radio signal and posts the same on the cloud server.

A responder can log into the SIMBIoasis dashboard and see the data posted by the Receiver into the cloud server. The 

SIMBIoasis system can be used in the following scenarios:

1. As a preparative measure for being aware of the existence and needs of the survivors in a remote area.

2. When multiple devices are deployed in different regions, the SIMBIoasis dashboard shows consolidated data and helps prioritise rescue team deployments.
 

### Current Problem

At the time of a natural calamity, having the network down can be a great pain in the ass/distress. Identification and estimation of the location, size, and the needs of the affected populace in remote areas can be a herculean task for the rescue teams. Many times, rescuing people from the ongoing or after-effect of a disaster is a race against time. Even with ample resources at hand, rescue teams are in a difficult position to efficiently coordinate, attend, and uniformly distribute helpful resources and services to the needy.

### Solution Description

Project SIMBIoasis is envisioned to connect the needs of a population in a remote area with no network connectivity. It facilitates gathering of information (such as exact location, need for food and/or medical attention, etc.) from android smartphones of affected users - via deployed IOT devices which relay the information to a cloud interface through Long Range, Low Bandwidth Radio Frequency communication. The cloud data can be accessed by the responders via a front-end. The key point is, the rescue team can be aware of the situation in any particular area before physically going/carrying the essential supplies to the affected place.

### Included Components

```markdown
# Hardware 
  - Rasberry Pi
  - Arduino Nano
  - SX-1798 RA-02 LoRa modules
  - GPS module
  - 433 MHz Antennas
  
# Software
  - IBM Cloud
  - IBM Node Server
  - IBM Cloudant DB
  - IBM Cloud ToolChain
  - Maps
```

### Featured Technologies

```markdown
- Angular7
- ExpressJS
- Python
- Cloudant
- LoRa Communication
- Android 
```

### Architecture Diagram



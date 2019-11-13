## Selfie

A simple app that lets the user to take a picture -even a selfie- with the
built-in camera of the device. The picture is transferred to an object detection 
service which will return the name of the objects that were successfully 
recognized. Neither the picture nor the results of the object detection are 
stored by the object detection service.

### Getting Started

Fetch all dependencies:
```
$ npm install
```

Start the app on a server:
```
$ npm start
```

### Configuration

The app has a configuration file (config/selfie.config.js). There are some 
options that can be configured in that file. Each option is well documented. 

Please always restart the application if you made changes to the configuration.

### Simple Usage

Start the app on a server. The server can be a laptop, a PC or a Raspberry Pi 
that is connected to a network and is capable tu run the app. 

The app will report the URL it has opened for serving requests. The app will 
also report if the configured object detection service is not available. In that
case object detection will fail. 

The URL that is reported by the app can be opened on a different device that has
a built-in camera. That device should also have a recent operating system and 
its browser must support HTML5 with WebRTC. Please refer to the user manual of 
the device or the manufacturer for these details. 

### Advanced Usage

#### Container mode

You may run the as an OCI compliant container. You need to build a container
image first. For that please make sure you have all the necessary tools 
installed. We will use podman for building the container. For more details on 
what to install before using podman please refer to podman's web site. 

##### Running container on x86
```
$ podman build --tag selfie:0.0.1-x86_64 -f Dockerfile
```

Upon success you may run the container: 
```
$ podman run -d --net host --name selfie selfie:0.0.1-x86_64
```

##### Running aarch64 container on x86

Kudos to the [Multiarch](https://github.com/multiarch/qemu-user-static) and 
[QEMU](https://www.qemu.org/) projects for making it easy to run "foreign" 
binaries (ie. software that was built for a different hardware architecture). 

We can build the selfie app for aarch64 (suitable for Raspberry Pi 3B+ and 
above) and then run that image on our x86 host. This is good for testing 
purposes, but the real reason of doing this is of course to prepare an aarch64
image. That image can be shared via a container image registry and let anybody
download and install it quickly on Raspberry Pi (or other aarch64 hardware).

This is how the aarch64 variant of selfie can be built on x86:

```
$ sudo podman run --rm --privileged multiarch/qemu-user-static --reset -p yes
$ podman build --tag selfie:0.0.1-aarch64 -f Dockerfile.aarch64
```

Upon success you may run the container using the aarch64 image:
```
$ podman run -d --net host --name selfie selfie:0.0.1-aarch64
```

### Deploy to k3s or Kubernetes

Coming soon.

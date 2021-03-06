---
title: scanner (Directory)
---

If it is not possible to use the official Docker Image of your scanner (e.g. there is no official repository) you will need to create a `scanner` directory containing a Dockerfile and maybe a `wrapper.sh`.

## Dockerfile

The Dockerfile should be minimal and based on the official *alpine* baseimage. 
Please make sure to add a new user for your scanner.
Please change the user using `UID`. This enables the Image to run in clusters which have a strict `runAsNonRoot` policy (See [Pod Security Policies | Kubernetes](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#users-and-groups).
A Dockerimage for nmap would look the following:

```dockerfile
FROM alpine:3.12
RUN apk add --no-cache nmap=7.80-r2 nmap-scripts=7.80-r2
RUN addgroup --system --gid 1001 nmap && adduser nmap --system --uid 1001 --ingroup nmap
USER 1001
CMD [nmap]
```

## wrapper.sh

Sometimes it will be necessary to wrap the scanner e.g. the scanner returns bad exit codes when they identify findings.
This would cause the Kubernetes jobs to fail even thought the scanner has actually run successfully, after all it's "their job" to identify findings.
Please provide this script as `wrapper.sh` and use it as `CMD` value in your Dockerfile.



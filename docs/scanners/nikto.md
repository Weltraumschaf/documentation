---
title: "Nikto"
path: "scanners/nikto"
category: "scanner"
type: "Webserver"
state: "released"
appVersion: "2.1.6"
usecase: "Webserver Vulnerability Scanner"
---

![nikto logo](https://cirt.net/files/alienlogo_3.gif)

Nikto is a free software command-line vulnerability scanner that scans webservers for dangerous files/CGIs, outdated server software and other problems. It performs generic and server type specific checks. It also captures and prints any cookies received. To learn more about the Nikto scanner itself visit [cirt.net] or [Nikto GitHub].

<!-- end -->

## Deployment

The Nikto ScanType can be deployed via helm:

```bash
helm upgrade --install nikto ./scanners/nikto/
```

## Configuration

The following security scan configuration example are based on the [Nikto Documentation](https://cirt.net/nikto2-docs/usage.html#id2780332), please take a look at the original documentation for more configuration examples.

* The most basic Nikto scan requires simply a host to target, since port 80 is assumed if none is specified. The host can either be an IP or a hostname of a machine, and is specified using the -h (-host) option. This will scan the IP 192.168.0.1 on TCP port 80: `-h 192.168.0.1`
* To check on a different port, specify the port number with the -p (-port) option. This will scan the IP 192.168.0.1 on TCP port 443: `-h 192.168.0.1 -p 443`
* Hosts, ports and protocols may also be specified by using a full URL syntax, and it will be scanned: `-h https://192.168.0.1:443/`
* Nikto can scan multiple ports in the same scanning session. To test more than one port on the same host, specify the list of ports in the -p (-port) option. Ports can be specified as a range (i.e., 80-90), or as a comma-delimited list, (i.e., 80,88,90). This will scan the host on ports 80, 88 and 443: `-h 192.168.0.1 -p 80,88,443`

Nikto also has a comprehensive list of [command line options documented](https://cirt.net/nikto2-docs/options.html) which maybe useful to use.

* Scan tuning can be used to decrease the number of tests performed against a target. By specifying the type of test to include or exclude, faster, focused testing can be completed. This is useful in situations where the presence of certain file types are undesired -- such as XSS or simply "interesting" files. Test types can be controlled at an individual level by specifying their identifier to the -T (-Tuning) option. In the default mode, if -T is invoked only the test type(s) specified will be executed. For example, only the tests for "Remote file retrieval" and "Command execution" can performed against the target: `192.168.0.1 -T 58`
  * 0 - File Upload. Exploits which allow a file to be uploaded to the target server.
  * 1 - Interesting File / Seen in logs. An unknown but suspicious file or attack that has been seen in web server logs (note: if you have information regarding any of these attacks, please contact CIRT, Inc.).
  * 2 - Misconfiguration / Default File. Default files or files which have been misconfigured in some manner. This could be documentation, or a resource which should be password protected.
  * 3 - Information Disclosure. A resource which reveals information about the target. This could be a file system path or account name.
  * 4 - Injection (XSS/Script/HTML). Any manner of injection, including cross site scripting (XSS) or content (HTML). This does not include command injection.
  * 5 - Remote File Retrieval - Inside Web Root. Resource allows remote users to retrieve unauthorized files from within the web server's root directory.
  * 6 - Denial of Service. Resource allows a denial of service against the target application, web server or host (note: no intentional DoS attacks are attempted).
  * 7 - Remote File Retrieval - Server Wide. Resource allows remote users to retrieve unauthorized files from anywhere on the target.
  * 8 - Command Execution / Remote Shell. Resource allows the user to execute a system command or spawn a remote shell.
  * 9 - SQL Injection. Any type of attack which allows SQL to be executed against a database.
  * a - Authentication Bypass. Allows client to access a resource it should not be allowed to access.
  * b - Software Identification. Installed software or program could be positively identified.
  * c - Remote source inclusion. Software allows remote inclusion of source code.
  * x - Reverse Tuning Options. Perform exclusion of the specified tuning type instead of inclusion of the specified tuning type

[cirt.net]: https://cirt.net/
[nikto github]: https://github.com/sullo/nikto



## Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="demo-bodgeit"
  values={[{"label":"Demo-bodgeit","value":"demo-bodgeit"},{"label":"Demo-juice-shop","value":"demo-juice-shop"},{"label":"Demo-secureCodeBox.io","value":"demo-secureCodeBox.io"}]}>
            
            
<TabItem value="demo-bodgeit">
  
<div>

</div>

<Tabs
defaultValue="sc"
values={[
  {label: 'Scan', value: 'sc'}, 
  {label: 'Findings', value: 'fd'},
]}>


<TabItem value="sc">

```yaml

apiVersion: 'execution.experimental.securecodebox.io/v1'
kind: Scan
metadata:
  name: 'nikto-bodgeit'
  labels:
    organization: 'secureCodeBox'
spec:
  scanType: 'nikto'
  parameters:
    - '-h'
    - 'bodgeit'
    - '-port 8080'
    - '-Tuning'
    # Only enable fast (ish) Scan Options, remove attack option like SQLi and RCE. We will leave those to ZAP
    - '1,2,3,5,7,b'


```

</TabItem>



<TabItem value="fd">


```yaml

[
  {
    "name": "The anti-clickjacking X-Frame-Options header is not present.",
    "description": null,
    "category": "X-Frame-Options Header",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "LOW",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 999957
    },
    "id": "9fc0b231-3a91-4976-ad59-35d59a585a38"
  },
  {
    "name": "The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS",
    "description": null,
    "category": "X-XSS-Protection",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "LOW",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 999102
    },
    "id": "fd763ddc-beaf-4bb0-91f6-334fadfaad03"
  },
  {
    "name": "The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type",
    "description": null,
    "category": "X-Content-Type-Options Header",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 999103
    },
    "id": "08fc1392-6da9-4d57-beb2-dc7f72bea503"
  },
  {
    "name": "/favicon.ico file identifies this app/server as: Apache Tomcat (possibly 5.5.26 through 8.0.15), Alfresco Community",
    "description": null,
    "category": "Identified Software",
    "location": "http://bodgeit/favicon.ico",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 500645
    },
    "id": "4a6b694c-b0ac-465e-929e-8e67cbded3a8"
  },
  {
    "name": "Allowed HTTP Methods: GET, HEAD, POST, PUT, DELETE, OPTIONS",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "OPTIONS",
      "port": 8080,
      "niktoId": 999990
    },
    "id": "7fe0661b-1eac-4e7c-ad02-0fa5b293700c"
  },
  {
    "name": "HTTP method ('Allow' Header): 'PUT' method could allow clients to save files on the web server.",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 400001
    },
    "id": "f63b2cd6-cb19-43f5-a086-c5084e8b8e2b"
  },
  {
    "name": "HTTP method ('Allow' Header): 'DELETE' may allow clients to remove files on the web server.",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://bodgeit/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.105.36.237",
      "hostname": "bodgeit",
      "banner": "Apache-Coyote/1.1",
      "method": "GET",
      "port": 8080,
      "niktoId": 400000
    },
    "id": "237ff776-7fc1-4509-b51e-d916b3951422"
  }
]


```


</TabItem>


</Tabs>
          
</TabItem>
          
<TabItem value="demo-juice-shop">
  
<div>

</div>

<Tabs
defaultValue="sc"
values={[
  {label: 'Scan', value: 'sc'}, 
  {label: 'Findings', value: 'fd'},
]}>


<TabItem value="sc">

```yaml

apiVersion: 'execution.experimental.securecodebox.io/v1'
kind: Scan
metadata:
  name: 'nikto-juice-shop'
  labels:
    organization: 'secureCodeBox'
spec:
  scanType: 'nikto'
  parameters:
    - '-h'
    - 'juice-shop'
    - '-port 3000'
    - '-Tuning'
    # Only enable fast (ish) Scan Options, remove attack option like SQLi and RCE. We will leave those to ZAP
    - '1,2,3,5,7,b'


```

</TabItem>



<TabItem value="fd">


```yaml

[
  {
    "name": "Retrieved x-powered-by header: Express",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://juice-shop/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "GET",
      "port": 3000,
      "niktoId": 999986
    },
    "id": "f583114f-2728-4c4a-a058-0386965461e8"
  },
  {
    "name": "Retrieved access-control-allow-origin header: *",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://juice-shop/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "GET",
      "port": 3000,
      "niktoId": 999986
    },
    "id": "73239041-0bea-4dfe-9201-5806b33e0685"
  },
  {
    "name": "The X-XSS-Protection header is not defined. This header can hint to the user agent to protect against some forms of XSS",
    "description": null,
    "category": "X-XSS-Protection",
    "location": "http://juice-shop/",
    "osi_layer": "NETWORK",
    "severity": "LOW",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "GET",
      "port": 3000,
      "niktoId": 999102
    },
    "id": "cd491b84-79de-4ec2-bcb8-52d693f05527"
  },
  {
    "name": "Entry '/ftp/' in robots.txt returned a non-forbidden or redirect HTTP code (200)",
    "description": null,
    "category": "Nikto Finding",
    "location": "http://juice-shop/ftp/",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "GET",
      "port": 3000,
      "niktoId": 999997
    },
    "id": "5a91aacc-1d90-41ca-8322-6a226832149e"
  },
  {
    "name": "\"robots.txt\" contains 1 entry which should be manually viewed.",
    "description": null,
    "category": "robots.txt",
    "location": "http://juice-shop/robots.txt",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "GET",
      "port": 3000,
      "niktoId": 999996
    },
    "id": "2b7a3d50-6efa-4fa6-a762-104fe3e014d1"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "20b9a27b-62de-472b-91f9-726b5948b512"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "a12741f9-c605-4d38-95a4-6f4f3a552455"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "bd3586b1-2585-4586-8a27-e6451e79d263"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "745d41af-e841-4e5b-99ad-0dda0f53d95c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "570931c6-5134-46c6-98cd-e8e5e7616ac6"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "1ce12475-3de0-4339-bc64-4fed5bbc6dd9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f39d839a-3a90-4955-bd3d-a7d7268b81dc"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "644be13c-f950-4807-a16a-f7874014c0d0"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "3987883d-0888-4dc0-abda-c014019c1fe8"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "5d5ddba9-84f7-4331-88af-f03024038be7"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "2a4b9f7c-b75b-4c2c-9998-b311d6f76ae1"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7222dd67-e68b-4999-8ae4-bab564e8e84b"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "e930eb73-fb8d-41ae-b1e9-da292080522a"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f5ec2548-849f-45ac-8a2b-0b115c40960e"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "4f60ac7c-b54a-4309-917b-297645137640"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "dc299fdc-1498-4959-9603-6c256287b0e4"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ea5c3dcf-0321-4363-8f03-b4ea732a7270"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "310722fe-7490-4172-a4e4-809b6eaf1756"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "087ab987-5f61-41c1-9a33-a0728cc2ba5c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "52b5afe9-046c-449a-9b4d-0ad712165a3c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "bf40b84f-76c6-4bd8-860c-080d69075cf9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "9f736622-fc06-4771-9e9e-c3f1b1ceedff"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7ed91337-a9e3-4755-9c9c-f496bc7745e7"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "0db3a8b6-93cb-4319-ad7c-1eb8b1346205"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "4e047b68-b48e-4908-bfe2-84aa2ba914c9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "47edf175-0730-431d-b6c6-038324d75f41"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "59aa0728-7b58-4aa6-841e-0bc43bbac444"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "599cb4f6-51eb-4944-89a7-bd85bf1ddac9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c6874e6b-0530-4033-98af-241f7c24fe6d"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "3a54781c-a66a-4136-b0fc-42bcc487b545"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f2eb954b-3ad8-4f0b-a43b-0c0f42ca2cf0"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "e2d7e804-c667-415c-ba04-366b4c13bfd0"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8c958ace-2b67-42d1-8e50-6eed8983a730"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ab80efcd-3000-451f-be08-8fcdb72eaad7"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ca4e5084-803f-4ec8-98e0-e90fcc3b7166"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f598bea3-b2d8-458a-a325-96a3d7147966"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8be2eb5e-2865-4b87-88dc-583af046da6d"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "03f5eefc-aa08-4d55-9f0d-d9d90e6c0adc"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c55cd522-e70f-4179-a46e-b6ba2ed26f1e"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "0cba8524-9e83-413f-b8cf-73f2d11fae4c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8c73f169-3059-4a0a-8d4b-efe071d7bfad"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "089256d5-9ff1-4b33-869c-61c934d7289b"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ca5709d0-be96-4260-b313-231ef6d2795b"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "1c5909b0-fc46-48d3-a199-59d100827202"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "e066e494-4acd-43ce-ae27-a6e754089345"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "beacc79a-e34c-42fa-a7fe-8b829634c055"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7e641d05-d748-45e0-8d67-adc05e5431b2"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8643683f-9b1d-416e-94ce-9591e271fddb"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ed70da8f-90bd-45ff-bfb4-d19625e4e8b1"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "54a64ba8-2141-4909-8d50-1e79ad8ee83f"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "d337ac57-43ce-498d-b6dd-b05ca62d0ed8"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ab82d8f4-d49a-43cb-88b7-7ef88242a359"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "93d1be87-5647-4500-8898-8b8d46fbb766"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "e52b4788-716b-4bfb-b0f5-9ad6455d5e81"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "77c3e373-3cac-4913-aad0-e4c59f60f965"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.sql",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "3394df36-3d40-43ec-9593-d3dbefaffd2f"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c8220b74-73a7-4399-86a5-e01d4476d5be"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "710ea26b-c5bd-42a5-8c7d-2b89a80589f9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ceb5d33d-d256-4597-9f42-d15db51c3189"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "404a0054-55b8-49ee-a88b-80e41608a6d3"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "abe1072e-ff8e-4b2d-be53-f4a38d0b1859"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "6c2eb94e-601b-4052-a71d-4a5ada76a82f"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "71b72822-a03a-438a-ba20-a09e402074c8"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "fc818e74-8228-4e31-b7af-521bc7320cbe"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "3ae198df-3276-429e-abd1-3637855bee7e"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.tgz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "106726d1-3044-4ff6-ad7f-daf9c71f07e4"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f20f9e9d-dad4-4cb4-be9e-5335b4a936b3"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "6bb839d0-6ac8-4ecf-bf0b-ec414a815ccd"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8857d056-25c1-447f-b0b1-294a4d97b965"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7e2325ec-c306-4089-967b-1275d5e33c07"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "94d047b1-b7cc-4a8a-a008-6defe85a87f3"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "332fe077-ed96-4e21-b489-06a27b5906de"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "fbf861f3-4eb8-4baa-9a52-7e8bac378ba5"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "e93ec064-ae9b-43c4-ad1f-d04fad8981d2"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.jks",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "b20c1d9e-c3b3-40f8-b7d7-cbc02242807c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "dbbcdcba-e91a-47d8-a3f8-0fce115e036c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f2d18256-f1c2-44b9-9f21-3b83be1e8bf5"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "a1a55843-70c1-40e7-a68e-8540430657a4"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.zip",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "73a17664-d0e6-4996-94ef-49b7a97b5c55"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "073eb179-0060-4b90-ac0c-83b18dc22336"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "b3a886a6-8c3a-4b1b-99e9-950d8d1a2098"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.pem",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f34f3835-e4f2-4967-89bd-9120840749a6"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7921bcdb-c926-42e1-af47-72738cf7d03b"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "aca14ba9-b06e-40a8-a307-304e1ff81058"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c8244cab-0986-47aa-9732-0da61694bccb"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "7309d5c6-a3b2-49e3-86b8-e8127ce1dad3"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/site.tar.bz2",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c09c09b3-bda5-4bbd-b0a2-3f81c6fe8ee9"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.war",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "3e50c9e4-4f5b-4f8b-ac69-e36c41a034e7"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.egg",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "c082ce91-d562-417b-af39-ffec8a963d3d"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ed1badc5-3c65-4bfb-9cf8-3b5784c08f71"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.tar",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "b6fd8586-1420-4883-beb9-a95792c7bbbf"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/database.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "ddb82345-4f24-4c7f-8998-1d8a684aa1c1"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/10.111.44.167.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "8081cda7-94ff-4c69-bbf3-5bb3c9754b6c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/juice-shop.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "552baa54-2f18-4f0c-a44b-c860c937eb78"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/backup.cer",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "394dea81-0434-43b3-bcfd-7a951e3c366c"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/dump.alz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "f18aada5-3558-499f-8af3-c43641d044b8"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.tar.lzma",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "919b7475-a7b0-4b89-8960-886b93d575ee"
  },
  {
    "name": "Potentially interesting backup/cert file found.",
    "description": null,
    "category": "Potential Backup File",
    "location": "http://juice-shop/archive.tar.gz",
    "osi_layer": "NETWORK",
    "severity": "INFORMATIONAL",
    "attributes": {
      "ip_address": "10.111.44.167",
      "hostname": "juice-shop",
      "banner": "",
      "method": "HEAD",
      "port": 3000,
      "niktoId": 740001
    },
    "id": "211dbe86-3b1c-41f5-aa7c-90ed12eddd27"
  }
]


```


</TabItem>


</Tabs>
          
</TabItem>
          
<TabItem value="demo-secureCodeBox.io">
  
<div>

</div>

<Tabs
defaultValue="sc"
values={[
  {label: 'Scan', value: 'sc'}, 
  ,
]}>


<TabItem value="sc">

```yaml

apiVersion: 'execution.experimental.securecodebox.io/v1'
kind: Scan
metadata:
  name: 'nikto-www.securecodebox.io'
  labels:
    organization: 'secureCodeBox'
spec:
  scanType: 'nikto'
  parameters:
    - '-h'
    - 'https://www.securecodebox.io'
    - '-Tuning'
    # Only enable fast (ish) Scan Options, remove attack option like SQLi and RCE. We will leave those to ZAP
    - '1,2,3,5,7,b'


```

</TabItem>




</Tabs>
          
</TabItem>
          
</Tabs>
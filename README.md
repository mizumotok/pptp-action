# Connect to L2TP/IPSec VPN
<p>
  <a href="https://github.com/mizumotok/pptp-action/actions"><img alt="pptp-action status" src="https://github.com/mizumotok/pptp-action/workflows/build-test/badge.svg"></a>
</p>

This action connects to VPN via PPTP. It supports Ubuntu platform only.

# Usage
```yaml
- name: Connect to PPTP VPN
  uses: mizumotok/pptp-action@v1
  with:
    server: ${{ secrets.VPN_SERVER }}
    username: ${{ secrets.VPN_USERNAME }}
    password: ${{ secrets.VPN_PASSWORD }}
```

# Inputs
|Key|Description|Required|
|-|-|-|
|server|the IP address or host name of the server|Yes|
|username|the username you are to use|Yes|
|password|the password you are to use. If you don't specify a password, pptpsetup will ask for one.|Yes|

import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as tmp from 'tmp'

export default async function createIpUpLocal(): Promise<void> {
  const content = [
    '#!/bin/bash',
    'case "$6" in',
    'myvpn)',
    'sbin/route add -net ${4%.*}.0 netmask 255.255.255.0 gw $4',
    'echo',
    ';;',
    'esac'
  ]

  const tmpobj = tmp.fileSync()
  fs.writeFileSync(tmpobj.name, content.join('\n'))
  await exec.exec(`sudo mv ${tmpobj.name} /etc/ppp/ip-up.local`)
  await exec.exec('sudo chmod +x /etc/ppp/ip-up.local')
}

import * as core from '@actions/core'
import * as coreCommand from '@actions/core/lib/command'
import * as exec from '@actions/exec'
import * as process from 'process'
import createIpUpLocal from './createIpUpLocal'

const env = process.env
if (env.RUNNER_OS !== 'Linux') {
  core.setFailed(`Unsupported Platform: ${env.RUNNER_OS}`)
  process.exit(1)
}
const IsPost = !!env['STATE_isPost']

if (!IsPost) {
  coreCommand.issueCommand('save-state', {name: 'isPost'}, 'true')
}

async function run(): Promise<void> {
  try {
    const server = core.getInput('server', {required: true})
    const username = core.getInput('username', {required: true})
    const password = core.getInput('password', {required: true})

    await exec.exec('sudo apt-get install pptp-linux')
    await exec.exec(
      `sudo pptpsetup --create myvpn --server ${server} --username ${username} --password ${password} --encrypt`
    )
    await createIpUpLocal()

    await exec.exec('sudo cat /etc/ppp/peers/myvpn')
    await exec.exec('sudo cat /etc/ppp/chap-secrets')

    await exec.exec('sudo modprobe nf_conntrack_pptp')

    await exec.exec('sudo pppd call myvpn debug dump logfd 2 updetach')
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    await exec.exec('sudo tail -n 30 /var/log/syslog')
  }
}

async function cleanup(): Promise<void> {
  try {
    await exec.exec('sudo pkill -TERM pppd')
  } catch (error) {
    core.warning(error.message)
  }
}

if (!IsPost) {
  run()
} else {
  cleanup()
}

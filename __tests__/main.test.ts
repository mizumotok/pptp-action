import * as exec from '@actions/exec'
import * as fs from 'fs'
import createIpUpLocal from '../src/createIpUpLocal'

jest.mock('@actions/exec', () => ({
  exec: jest.fn()
}))

jest.mock('fs', () => ({
  writeFileSync: jest.fn()
}))

jest.mock('tmp', () => ({
  fileSync: jest.fn().mockImplementation(() => ({name: '/tmp/tmpfile456'}))
}))

test('createIpUpLocal', async () => {
  await createIpUpLocal()
  expect(fs.writeFileSync).toHaveBeenCalledWith(
    '/tmp/tmpfile456',
    expect.stringMatching(/^#!\/bin\/bash\ncase/s)
  )
  expect(exec.exec).toHaveBeenCalledWith(
    'sudo mv /tmp/tmpfile456 /etc/ppp/ip-up.local'
  )
  expect(exec.exec).toHaveBeenCalledWith('sudo chmod +x /etc/ppp/ip-up.local')
})

import { type ChildProcess, spawn } from 'node:child_process'
import path from 'node:path'
import {
  BACKEND_PORT,
  FRONTEND_PORT,
  RESUME_MATCHER_BACKEND_DIR,
  RESUME_MATCHER_FRONTEND_DIR,
  ROOT_DIR,
} from './constants.ts'
import { venvPython } from './venv.ts'

type SpawnOptions = {
  foreground?: boolean
}

function spawnProcess(
  command: string,
  args: string[],
  cwd: string,
  options: SpawnOptions = {},
): ChildProcess {
  const child = spawn(command, args, {
    cwd,
    env: process.env,
    stdio: 'inherit',
    shell: false,
  })

  if (!options.foreground) {
    child.unref()
  }

  return child
}

export function spawnBackend(options: SpawnOptions = {}): ChildProcess {
  const python = venvPython()
  return spawnProcess(
    python,
    ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '0.0.0.0', '--port', String(BACKEND_PORT)],
    RESUME_MATCHER_BACKEND_DIR,
    options,
  )
}

export function spawnFrontend(options: SpawnOptions = {}): ChildProcess {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  return spawnProcess(npm, ['run', 'dev'], RESUME_MATCHER_FRONTEND_DIR, options)
}

export async function killPort(port: number): Promise<void> {
  if (process.platform === 'win32') {
    return
  }

  const { $ } = await import('zx')
  await $`lsof -ti:${port} | xargs -r kill -9`.nothrow().quiet()
}

export async function stopServers(): Promise<void> {
  await killPort(BACKEND_PORT)
  await killPort(FRONTEND_PORT)
}

export function waitForExit(child: ChildProcess): Promise<number | null> {
  return new Promise((resolve) => {
    child.on('exit', (code) => resolve(code))
    child.on('error', () => resolve(1))
  })
}

export { ROOT_DIR, path }

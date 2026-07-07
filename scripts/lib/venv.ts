import path from 'node:path'
import { VENV_DIR } from './constants.ts'

function venvBin(name: string): string {
  if (process.platform === 'win32') {
    return path.join(VENV_DIR, 'Scripts', name)
  }
  return path.join(VENV_DIR, 'bin', name)
}

export function venvPython(): string {
  return venvBin(process.platform === 'win32' ? 'python.exe' : 'python')
}

export function venvPlaywright(): string {
  return venvBin(process.platform === 'win32' ? 'playwright.exe' : 'playwright')
}

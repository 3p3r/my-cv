import { spawnBackend, spawnFrontend, stopServers, waitForExit } from './lib/processes.ts'
import { buildCv } from './build.ts'
import { seedMasterResume } from './seed-master-resume.ts'

await stopServers()

let backend = spawnBackend()
let frontend: ReturnType<typeof spawnFrontend> | null = null

const shutdown = async (signal?: string) => {
  if (signal) {
    console.log(`\nReceived ${signal}, shutting down...`)
  }
  backend.kill('SIGTERM')
  frontend?.kill('SIGTERM')
  await stopServers()
  process.exit(0)
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))

try {
  await buildCv()
  await seedMasterResume()
  frontend = spawnFrontend({ foreground: true })
  await waitForExit(frontend)
} finally {
  backend.kill('SIGTERM')
  await stopServers()
}

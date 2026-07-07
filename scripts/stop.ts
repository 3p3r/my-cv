import { stopServers } from './lib/processes.ts'

await stopServers()
console.log('Stopped servers on ports 8000 and 3000.')

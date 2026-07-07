import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BACKEND_HEALTH_URL,
  LOCAL_LLM_API_BASE,
  LOCAL_LLM_MODEL,
  LOCAL_LLM_PROVIDER,
} from './lib/constants.ts'

const MODELS_URL = `${LOCAL_LLM_API_BASE}/models`

async function testLocalModels(): Promise<void> {
  const response = await fetch(MODELS_URL, { signal: AbortSignal.timeout(10_000) })
  if (!response.ok) {
    throw new Error(`Models endpoint failed (${response.status}): ${MODELS_URL}`)
  }

  const payload = (await response.json()) as { data?: Array<{ id: string }> }
  const ids = (payload.data ?? []).map((model) => model.id)
  console.log(`Local models at ${MODELS_URL}: ${ids.join(', ')}`)

  if (!ids.includes(LOCAL_LLM_MODEL)) {
    throw new Error(`Configured model "${LOCAL_LLM_MODEL}" not in ${ids.join(', ')}`)
  }
}

async function testBackendHealth(): Promise<void> {
  const response = await fetch(BACKEND_HEALTH_URL, { signal: AbortSignal.timeout(10_000) })
  if (!response.ok) {
    throw new Error(`Backend health failed (${response.status}): ${BACKEND_HEALTH_URL}`)
  }
  console.log(`Backend health OK: ${BACKEND_HEALTH_URL}`)
}

async function testChatCompletion(): Promise<void> {
  const response = await fetch(`${LOCAL_LLM_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: LOCAL_LLM_MODEL,
      messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
      max_tokens: 256,
    }),
    signal: AbortSignal.timeout(120_000),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Chat completion failed (${response.status}): ${body}`)
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string; reasoning_content?: string } }>
  }
  const message = payload.choices?.[0]?.message
  const text = message?.content || message?.reasoning_content || ''
  console.log(`Chat completion via ${LOCAL_LLM_PROVIDER}/${LOCAL_LLM_MODEL}: ${text.slice(0, 120)}...`)
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  console.log(`Default LLM: ${LOCAL_LLM_PROVIDER} ${LOCAL_LLM_MODEL} @ ${LOCAL_LLM_API_BASE}`)
  await testLocalModels()
  await testChatCompletion()

  try {
    await testBackendHealth()
  } catch {
    console.log('Backend not running — skipping health check (start with npm run backend).')
  }

  console.log('LLM checks passed.')
}

export { testBackendHealth, testChatCompletion, testLocalModels }

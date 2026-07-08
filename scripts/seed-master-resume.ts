import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sleep } from "zx";
import {
  BACKEND_HEALTH_URL,
  CV_PDF,
  CV_YAML,
  RESUME_LIST_URL,
  RESUME_UPLOAD_URL,
  SEED_HASH_FILE,
} from "./lib/constants.ts";

const HEALTH_TIMEOUT_MS = 30_000;
const HEALTH_INTERVAL_MS = 500;

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function hashFile(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath);
  return createHash("sha256").update(content).digest("hex");
}

async function readSeedHash(): Promise<string | null> {
  if (!(await pathExists(SEED_HASH_FILE))) {
    return null;
  }
  return (await fs.readFile(SEED_HASH_FILE, "utf8")).trim();
}

async function writeSeedHash(hash: string): Promise<void> {
  await fs.writeFile(SEED_HASH_FILE, `${hash}\n`);
}

async function waitForBackend(): Promise<void> {
  const deadline = Date.now() + HEALTH_TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(BACKEND_HEALTH_URL);
      if (response.ok) {
        return;
      }
    } catch {
      // Backend not ready yet.
    }
    await sleep(HEALTH_INTERVAL_MS);
  }

  throw new Error(
    `Backend did not become healthy within ${HEALTH_TIMEOUT_MS / 1000}s (${BACKEND_HEALTH_URL})`,
  );
}

type ResumeSummary = {
  is_master?: boolean;
};

async function hasMasterResume(): Promise<boolean> {
  const response = await fetch(RESUME_LIST_URL);
  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as { data?: ResumeSummary[] };
  return (data.data ?? []).some((resume) => resume.is_master);
}

async function uploadMasterResume(): Promise<void> {
  const pdfBytes = await fs.readFile(CV_PDF);
  const form = new FormData();
  form.append(
    "file",
    new File([pdfBytes], path.basename(CV_PDF), { type: "application/pdf" }),
  );

  const response = await fetch(RESUME_UPLOAD_URL, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(600_000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resume upload failed (${response.status}): ${body}`);
  }

  const result = (await response.json()) as {
    resume_id?: string;
    processing_status?: string;
    message?: string;
  };

  console.log(
    `Master resume seeded: ${result.resume_id ?? "unknown"} (${result.processing_status ?? "unknown"})`,
  );
  if (result.processing_status === "failed") {
    console.warn(
      "LLM parsing failed — configure resume-matcher/apps/backend/.env with an API key for tailoring.",
    );
  }
}

export async function seedMasterResume(): Promise<void> {
  if (!(await pathExists(CV_PDF))) {
    throw new Error(`Missing ${CV_PDF}. Run "npm run build" first.`);
  }

  await waitForBackend();

  const currentHash = await hashFile(CV_YAML);
  const previousHash = await readSeedHash();
  const masterExists = await hasMasterResume();

  if (previousHash === currentHash && masterExists) {
    console.log("Master resume up to date — skipping upload.");
    return;
  }

  await uploadMasterResume();
  await writeSeedHash(currentHash);
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  await seedMasterResume();
}

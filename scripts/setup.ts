import fs from "node:fs/promises";
import path from "node:path";
import { $, cd } from "zx";
import {
  BACKEND_ENV,
  ENV_EXAMPLE,
  LOCAL_LLM_API_BASE,
  RESUME_MATCHER_DIR,
  RESUME_MATCHER_FRONTEND_DIR,
  RESUME_MATCHER_REPO,
  ROOT_DIR,
  VENV_DIR,
} from "./lib/constants.ts";
import { venvPlaywright, venvPython } from "./lib/venv.ts";

$.verbose = true;
cd(ROOT_DIR);

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureVenv(): Promise<void> {
  if (!(await pathExists(venvPython()))) {
    await $`python3 -m venv ${VENV_DIR}`;
  }
}

async function installPythonDeps(): Promise<void> {
  const python = venvPython();
  await $`${python} -m pip install --upgrade pip`;
  if (await pathExists(path.join(ROOT_DIR, "requirements.txt"))) {
    await $`${python} -m pip install -r requirements.txt`;
  }
  await $`${python} -m pip install .`;
}

async function installPlaywright(): Promise<void> {
  const playwright = venvPlaywright();
  if (await pathExists(playwright)) {
    await $`${playwright} install chromium`;
  } else {
    await $`${venvPython()} -m playwright install chromium`;
  }
}

async function ensureResumeMatcher(): Promise<void> {
  const gitDir = path.join(RESUME_MATCHER_DIR, ".git");
  if (!(await pathExists(gitDir))) {
    await $`git clone --depth 1 ${RESUME_MATCHER_REPO} ${RESUME_MATCHER_DIR}`;
  }

  if (await pathExists(RESUME_MATCHER_FRONTEND_DIR)) {
    cd(RESUME_MATCHER_FRONTEND_DIR);
    await $`npm install`;
    cd(ROOT_DIR);
  }
}

async function ensureBackendEnv(): Promise<void> {
  if (await pathExists(ENV_EXAMPLE)) {
    await fs.copyFile(ENV_EXAMPLE, BACKEND_ENV);
    console.log(
      `Synced ${BACKEND_ENV} from .env.example (local LLM: ${LOCAL_LLM_API_BASE}).`,
    );
  }
}

await ensureVenv();
await installPythonDeps();
await installPlaywright();
await ensureResumeMatcher();
await ensureBackendEnv();

console.log("Setup complete.");

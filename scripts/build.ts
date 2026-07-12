import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { $, cd } from "zx";
import { CV_MD, CV_YAML, README_MD, ROOT_DIR } from "./lib/constants.ts";
import { pdfLinkMarkdown } from "./lib/pdf-link.ts";
import { venvPython } from "./lib/venv.ts";

export async function syncReadme(): Promise<void> {
  const markdown = await fs.readFile(CV_MD, "utf8");
  await fs.writeFile(README_MD, `${pdfLinkMarkdown()}\n\n${markdown}`);
  console.log(
    `Synced ${path.relative(ROOT_DIR, README_MD)} from RenderCV output.`,
  );
}

export async function buildCv(watch = false): Promise<void> {
  $.verbose = true;
  cd(ROOT_DIR);

  const python = venvPython();
  const yamlPath = path.relative(ROOT_DIR, CV_YAML);

  if (watch) {
    await $`${python} -m rendercv render ${yamlPath} --watch`;
  } else {
    await $`${python} -m rendercv render ${yamlPath}`;
    await syncReadme();
  }
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  const watch = process.argv.includes("--watch");
  await buildCv(watch);
}

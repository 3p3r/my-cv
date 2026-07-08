import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { $, cd } from "zx";
import {
  CV_HTML,
  CV_YAML,
  ROOT_DIR,
  SITE_DIR,
  SITE_INDEX,
} from "./lib/constants.ts";
import { venvPython } from "./lib/venv.ts";

export async function buildPages(): Promise<void> {
  $.verbose = true;
  cd(ROOT_DIR);

  const python = venvPython();
  const yamlPath = path.relative(ROOT_DIR, CV_YAML);

  await $`${python} -m rendercv render ${yamlPath} --dont-generate-pdf --dont-generate-typst --dont-generate-png --dont-generate-markdown`;

  await fs.mkdir(SITE_DIR, { recursive: true });
  await fs.copyFile(CV_HTML, SITE_INDEX);
  console.log(
    `Wrote ${path.relative(ROOT_DIR, SITE_INDEX)} (same output as GitHub Pages).`,
  );
}

const isMain =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
  await buildPages();
}

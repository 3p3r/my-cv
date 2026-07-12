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
import { enhancePagesHtml } from "./lib/site-html.ts";
import { venvPython } from "./lib/venv.ts";

export async function buildPages(): Promise<void> {
  $.verbose = true;
  cd(ROOT_DIR);

  const python = venvPython();
  const yamlPath = path.relative(ROOT_DIR, CV_YAML);

  await $`${python} -m rendercv render ${yamlPath} --dont-generate-pdf --dont-generate-typst --dont-generate-png`;

  await fs.mkdir(SITE_DIR, { recursive: true });
  const html = await fs.readFile(CV_HTML, "utf8");
  await fs.writeFile(SITE_INDEX, enhancePagesHtml(html));
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

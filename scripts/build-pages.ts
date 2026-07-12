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
import { pdfLinkHtml } from "./lib/pdf-link.ts";
import { venvPython } from "./lib/venv.ts";

function injectPdfLink(html: string): string {
  const marker = ['<article class="markdown-body">', "<body>"].find((value) =>
    html.includes(value),
  );

  if (!marker) {
    throw new Error("Could not find the HTML body in the rendered CV.");
  }

  return html.replace(marker, `${marker}\n${pdfLinkHtml()}`);
}

export async function buildPages(): Promise<void> {
  $.verbose = true;
  cd(ROOT_DIR);

  const python = venvPython();
  const yamlPath = path.relative(ROOT_DIR, CV_YAML);

  await $`${python} -m rendercv render ${yamlPath} --dont-generate-pdf --dont-generate-typst --dont-generate-png`;

  await fs.mkdir(SITE_DIR, { recursive: true });
  const html = await fs.readFile(CV_HTML, "utf8");
  await fs.writeFile(SITE_INDEX, injectPdfLink(html));
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

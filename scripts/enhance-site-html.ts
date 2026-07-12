import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_INDEX } from "./lib/constants.ts";
import { enhancePagesHtml } from "./lib/site-html.ts";

const targetPath = path.resolve(process.argv[2] ?? SITE_INDEX);
const html = await fs.readFile(targetPath, "utf8");
await fs.writeFile(targetPath, enhancePagesHtml(html));
console.log(`Enhanced ${path.relative(process.cwd(), targetPath)}.`);

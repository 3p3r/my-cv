import fs from "node:fs/promises";
import path from "node:path";

const NIGHTLY_PDF_URL =
  "https://github.com/3p3r/my-cv/releases/download/nightly/Sepehr_Laal_CV.pdf";
const GITHUB_PROFILE_URL = "https://github.com/3p3r";

const SITE_STYLES = `
.github-ribbon {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    width: 13em;
    height: 13em;
    overflow: hidden;
    pointer-events: none;
}

.github-ribbon a {
    pointer-events: auto;
    position: absolute;
    top: 3.4em;
    right: -2.35em;
    transform: rotate(45deg);
    display: block;
    width: 13.5em;
    text-align: center;
    white-space: nowrap;
    background: #24292f;
    color: #fff;
    text-decoration: none;
    font: 600 11px/1.2 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
        Arial, sans-serif;
    padding: 0.55em 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.github-ribbon a:hover {
    background: #1f2328;
}
`;

function pdfLinkHtml() {
  return `<p><a href="${NIGHTLY_PDF_URL}">Download resume (PDF)</a></p>`;
}

function githubRibbonHtml() {
  return `<div class="github-ribbon"><a href="${GITHUB_PROFILE_URL}">Follow me on GitHub</a></div>`;
}

function injectSiteStyles(html) {
  if (html.includes("</style>")) {
    return html.replace("</style>", `${SITE_STYLES}</style>`, 1);
  }

  return html.replace("</head>", `<style>${SITE_STYLES}</style>\n</head>`, 1);
}

function injectAfterBodyOpen(html, snippet) {
  const marker = "<body>";
  if (!html.includes(marker)) {
    throw new Error("Could not find the HTML body in the rendered CV.");
  }

  return html.replace(marker, `${marker}\n${snippet}`, 1);
}

function injectIntoArticle(html, snippet) {
  const marker = ['<article class="markdown-body">', "<body>"].find((value) =>
    html.includes(value),
  );

  if (!marker) {
    throw new Error("Could not find the HTML body in the rendered CV.");
  }

  return html.replace(marker, `${marker}\n${snippet}`, 1);
}

export function enhancePagesHtml(html) {
  return injectIntoArticle(
    injectAfterBodyOpen(injectSiteStyles(html), githubRibbonHtml()),
    pdfLinkHtml(),
  );
}

const targetPath = path.resolve(process.argv[2] ?? "site/index.html");
const html = await fs.readFile(targetPath, "utf8");
await fs.writeFile(targetPath, enhancePagesHtml(html));
console.log(`Enhanced ${path.relative(process.cwd(), targetPath)}.`);

import { GITHUB_PROFILE_URL } from "./constants.ts";
import { pdfLinkHtml } from "./pdf-link.ts";

const SITE_STYLES = `
.github-ribbon {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    width: 12em;
    height: 12em;
    overflow: hidden;
    pointer-events: none;
}

.github-ribbon a {
    pointer-events: auto;
    position: absolute;
    top: 2.5em;
    right: -3.5em;
    transform: rotate(45deg);
    background: #24292f;
    color: #fff;
    text-decoration: none;
    font: 600 11px/1.2 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
        Arial, sans-serif;
    padding: 0.6em 4em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.github-ribbon a:hover {
    background: #1f2328;
}
`;

function githubRibbonHtml(): string {
  return `<div class="github-ribbon"><a href="${GITHUB_PROFILE_URL}">Follow me on GitHub</a></div>`;
}

function injectSiteStyles(html: string): string {
  if (html.includes("</style>")) {
    return html.replace("</style>", `${SITE_STYLES}</style>`, 1);
  }

  return html.replace(
    "</head>",
    `<style>${SITE_STYLES}</style>\n</head>`,
    1,
  );
}

function injectAfterBodyOpen(html: string, snippet: string): string {
  const marker = "<body>";
  if (!html.includes(marker)) {
    throw new Error("Could not find the HTML body in the rendered CV.");
  }

  return html.replace(marker, `${marker}\n${snippet}`, 1);
}

function injectIntoArticle(html: string, snippet: string): string {
  const marker = ['<article class="markdown-body">', "<body>"].find((value) =>
    html.includes(value),
  );

  if (!marker) {
    throw new Error("Could not find the HTML body in the rendered CV.");
  }

  return html.replace(marker, `${marker}\n${snippet}`, 1);
}

export function enhancePagesHtml(html: string): string {
  return injectIntoArticle(
    injectAfterBodyOpen(injectSiteStyles(html), githubRibbonHtml()),
    pdfLinkHtml(),
  );
}

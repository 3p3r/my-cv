import { NIGHTLY_PDF_URL } from "./constants.ts";

const PDF_LINK_TEXT = "Download resume (PDF)";

export function pdfLinkMarkdown(): string {
  return `[${PDF_LINK_TEXT}](${NIGHTLY_PDF_URL})`;
}

export function pdfLinkHtml(): string {
  return `<p><a href="${NIGHTLY_PDF_URL}">${PDF_LINK_TEXT}</a></p>`;
}

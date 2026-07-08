import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

export const ROOT_DIR = rootDir;
export const CV_YAML = path.join(rootDir, "Sepehr_Laal_CV.yaml");
export const CV_PDF = path.join(
  rootDir,
  "rendercv_output",
  "Sepehr_Laal_CV.pdf",
);
export const CV_MD = path.join(rootDir, "rendercv_output", "Sepehr_Laal_CV.md");
export const CV_HTML = path.join(
  rootDir,
  "rendercv_output",
  "Sepehr_Laal_CV.html",
);
export const SITE_DIR = path.join(rootDir, "site");
export const SITE_INDEX = path.join(SITE_DIR, "index.html");
export const README_MD = path.join(rootDir, "README.md");
export const SEED_HASH_FILE = path.join(rootDir, ".rendercv-seed-hash");
export const VENV_DIR = path.join(rootDir, ".venv");
export const RESUME_MATCHER_DIR = path.join(rootDir, "resume-matcher");
export const RESUME_MATCHER_BACKEND_DIR = path.join(
  RESUME_MATCHER_DIR,
  "apps",
  "backend",
);
export const RESUME_MATCHER_FRONTEND_DIR = path.join(
  RESUME_MATCHER_DIR,
  "apps",
  "frontend",
);
export const BACKEND_ENV = path.join(RESUME_MATCHER_BACKEND_DIR, ".env");
export const ENV_EXAMPLE = path.join(rootDir, ".env.example");

export const BACKEND_PORT = 8000;
export const FRONTEND_PORT = 3000;
export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
export const BACKEND_HEALTH_URL = `${BACKEND_URL}/api/v1/health`;
export const RESUME_UPLOAD_URL = `${BACKEND_URL}/api/v1/resumes/upload`;
export const RESUME_LIST_URL = `${BACKEND_URL}/api/v1/resumes/list?include_master=true`;

export const LOCAL_LLM_API_BASE = "http://deezr:4000/v1";
export const LOCAL_LLM_MODEL = "smaller-qwens";
export const LOCAL_LLM_PROVIDER = "openai_compatible";

export const RESUME_MATCHER_REPO =
  "https://github.com/srbhr/Resume-Matcher.git";

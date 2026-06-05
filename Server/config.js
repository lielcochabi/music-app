import fs from "fs";
import path from "path";

// env.json is only used for local development; in production (Netlify
// serverless) config comes from process.env. We intentionally avoid
// import.meta.url / fileURLToPath here because the bundler compiles this ESM
// module to CommonJS, where import.meta.url is undefined and would crash the
// function at load time. Resolve from the working directory instead and guard
// against any read/parse error so a missing env.json never breaks startup.
const envPath = path.resolve(process.cwd(), "env.json");

let fileEnv = {};
try {
  if (fs.existsSync(envPath)) {
    fileEnv = JSON.parse(fs.readFileSync(envPath, "utf-8"));
  }
} catch (err) {
  console.warn(`Could not read ${envPath}: ${err.message}`);
}

const get = (key) => process.env[key] || fileEnv[key];

export const MONGODB_URI          = get("MONGODB_URI");
export const SPOTIFY_CLIENT_ID    = get("SPOTIFY_CLIENT_ID");
export const SPOTIFY_CLIENT_SECRET = get("SPOTIFY_CLIENT_SECRET");
export const JWT_SECRET           = get("JWT_SECRET");
export const PORT                 = get("PORT") || 3000;

for (const [key, val] of Object.entries({ MONGODB_URI, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, JWT_SECRET })) {
  if (!val) { console.error(`Missing required config: ${key}`); process.exit(1); }
}

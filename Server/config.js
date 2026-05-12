import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../env.json");

let fileEnv = {};
if (fs.existsSync(envPath)) {
  fileEnv = JSON.parse(fs.readFileSync(envPath, "utf-8"));
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

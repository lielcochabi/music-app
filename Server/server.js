import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import app from "./app.js";

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => { console.error("DB connection failed:", err); process.exit(1); });

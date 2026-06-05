// Minimal keepalive function: opens a MongoDB connection and pings the server
// so the Atlas free-tier (M0) cluster never reaches its ~60-day idle pause
// threshold. Imports only mongoose on purpose — it must not depend on the rest
// of the app (axios, yt-search/cheerio, etc.) so it can never be broken by an
// unrelated bundling issue. Runs on a schedule (see netlify.toml) and can also
// be invoked directly for a manual ping.
import mongoose from "mongoose";

export const handler = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "MONGODB_URI is not set in the environment" }),
    };
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    const result = await mongoose.connection.db.admin().ping();
    await mongoose.disconnect();
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, ping: result, at: new Date().toISOString() }),
    };
  } catch (err) {
    try { await mongoose.disconnect(); } catch {}
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};

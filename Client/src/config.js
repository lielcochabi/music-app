// In development: VITE_API_URL=http://localhost:3000 (set in .env.development)
// In production on Netlify: empty string — /api/* is redirected to the function
export const API_URL = import.meta.env.VITE_API_URL ?? "";

# Uzhavar AI

Uzhavar AI is a bilingual (Tamil/English) React + Vite experience that pairs crop planning tools with a conversational assistant backed by an Express + Google Gemini service. Farmers can submit their field details, review smart recommendations, and ask follow-up questions through text or speech.

## Tech Stack

- React 18, Vite, Tailwind CSS, Framer Motion, i18next
- Express 5 with CORS, dotenv, and the Google Gemini SDK
- Browser Speech Recognition/Synthesis APIs for hands-free chat

## Prerequisites

- Node.js 20+
- npm 10+
- A Google Gemini API key with access to `gemini-2.5-flash`

## Initial Setup

Install dependencies for both apps (run from the repo root):

```powershell
Push-Location .\uzhavar-ai; npm install; Pop-Location
Push-Location .\backend; npm install; Pop-Location
```

## Environment Variables

### Frontend (`uzhavar-ai/.env`)

```
VITE_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)

```
GEMINI_API_KEY=your-real-gemini-key
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
```

Copy the provided `.env.example` files if you prefer: `Copy-Item .env.example .env` inside each folder, then edit the values.

## Development

```powershell
# Terminal 1
Push-Location .\backend; npm start; Pop-Location

# Terminal 2
Push-Location .\uzhavar-ai; npm run dev -- --host; Pop-Location
```

The frontend expects the backend at `VITE_API_URL`. When the backend is running without an API key it returns friendly 503 guidance, so you can still iterate on the UI before provisioning secrets.

## Production Build

```powershell
Push-Location .\uzhavar-ai; npm run build; Pop-Location
```

The optimized assets are emitted to `uzhavar-ai/dist`. Deploy the backend separately--any Node-friendly host works.

## Troubleshooting

- Assistant shows "AI service is not configured yet": ensure the backend `.env` contains a valid `GEMINI_API_KEY` and restart `npm start`.
- 404s from the frontend fetch: confirm `VITE_API_URL` points to the backend origin and the backend server is listening on that port.
- Speech capture unavailable: the widget automatically falls back to text when the browser blocks the microphone; re-enable access in browser settings.

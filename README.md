# Uzhavar AI

Bilingual (Tamil/English) crop recommendation UI + a conversational assistant for Tamil Nadu farmers.

This repository contains two apps:

- `uzhavar-ai/` — React + Vite frontend (crop analysis screens + assistant widget)
- `backend/` — Express API that connects the assistant to Google Gemini

---

## What this project does

### Crop recommendations (frontend)
The **Analyze** page collects basic field inputs (district, soil type, water availability) and recommends the **top 2 crops** using a local scoring heuristic (no AI call required).

The recommendation score combines:

- Soil suitability
- Water suitability
- District suitability
- Season fit (based on the current month)
- Profit normalization

Crop data (profit, risk, seasons, water needs, district/soil/water scoring) is maintained in `uzhavar-ai/src/data/crops.js`.

### AI assistant chat (backend + frontend)
The floating assistant widget can send a question to the backend `POST /chat` endpoint.

- Backend uses `@google/generative-ai` with a Tamil Nadu agriculture-focused system prompt.
- Locale handling:
  - Frontend detects Tamil characters and sends `locale: "ta"` when applicable.
  - Backend replies in Tamil when `locale` is `ta`.
- Voice support (frontend):
  - Speech-to-text uses the browser’s `SpeechRecognition` / `webkitSpeechRecognition`.
  - Text-to-speech uses `speechSynthesis`.

---

## Architecture

![Architecture](images/architecture.png)

->|reply| F
```

---

## Tech stack

**Frontend** (`uzhavar-ai/`)

- React + React Router
- Vite
- Tailwind CSS
- i18next / react-i18next (Tamil + English)
- Framer Motion
- lucide-react

**Backend** (`backend/`)

- Express
- CORS
- dotenv
- `@google/generative-ai`

---

## Project structure

```
.
├─ backend/                 # Express API (Gemini chat)
├─ uzhavar-ai/              # React + Vite frontend
├─ images/                  # Repo images/assets
└─ README.md                # You are here
```

---

## Getting started (local development)

### 1) Install dependencies

From the repo root:

```powershell
# Backend deps
Push-Location .\backend
npm install
Pop-Location

# Frontend deps
Push-Location .\uzhavar-ai
npm install
Pop-Location
```

### 2) Configure environment variables

#### Backend (`backend/.env`)

Create a file at `backend/.env`:

```env
# Required for real AI answers
GEMINI_API_KEY=your_api_key_here

# Optional (defaults shown)
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
```

Notes:

- The backend reads `GEMINI_API_KEY` (or `OPENAI_API_KEY` as a fallback variable name).
- If no key is set, `POST /chat` returns `503` with a friendly “configure the key” message.

#### Frontend (`uzhavar-ai/.env`)

Create a file at `uzhavar-ai/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 3) Run the apps

Run backend (Terminal 1):

```powershell
cd .\backend
npm start
```

Run frontend (Terminal 2):

```powershell
cd .\uzhavar-ai
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## Scripts

### Frontend (`uzhavar-ai/`)

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

### Backend (`backend/`)

- `npm start` — start the API server

---

## API reference (backend)

### `GET /`
Health check.

Response example:

```json
{ "status": "ok", "message": "Uzhavar AI backend is running" }
```

### `POST /chat`
Send a chat message to the AI assistant.

Request body:

```json
{
  "message": "Which crop is best for red soil with medium water in Coimbatore?",
  "locale": "en"
}
```

Response body:

```json
{ "reply": "..." }
```

---

## Troubleshooting

- **Assistant says it can’t reach AI**
  - Confirm backend is running (`npm start` inside `backend/`).
  - Confirm `GEMINI_API_KEY` exists in `backend/.env`.
  - Confirm `VITE_API_URL` points to your backend URL.

- **Voice input doesn’t work**
  - The widget relies on the browser Web Speech APIs. Some browsers require mic permission and work best on `localhost` or HTTPS.

- **CORS / network errors**
  - Ensure the frontend is calling the correct backend origin (`VITE_API_URL`).

---

## Repo notes

- Frontend README (more UI-specific): `uzhavar-ai/README.md`
- This repo does not currently include a license file.

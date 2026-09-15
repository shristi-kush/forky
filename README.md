# Forky

A full-stack recipe app: browse and share recipes, manage your own, and optionally generate recipes with local AI (Ollama).

**Repo:** [github.com/shristi-kush/forky](https://github.com/shristi-kush/forky)

## Stack

| Layer | Folder | Tech |
|--------|--------|------|
| Frontend | `food_app/` | React 18 (Create React App), React Router |
| Backend | `backend-flask/` | Flask, SQLAlchemy, SQLite |
| Images | — | Cloudinary |
| AI (optional) | — | Ollama (`qwen2.5:3b` by default) |

## Features

- Landing page and recipe browse (home)
- User signup / login
- Create, edit, and delete recipes
- Recipe detail view
- Image upload via Cloudinary
- AI recipe generation from a prompt (cuisine, difficulty, servings)

## Project structure

```text
forky/
├── food_app/           # React frontend
└── backend-flask/      # Flask API + SQLite DB
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- (Optional) [Ollama](https://ollama.com/) for AI generation

## Setup

### 1. Backend

```bash
cd backend-flask
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python app.py
```

API runs at **http://localhost:5002** by default.  
SQLite DB: `backend-flask/instance/recipe_app.db`

### 2. Frontend

```bash
cd food_app
cp .env.example .env
npm install
npm start
```

App runs at **http://localhost:3000**.

Suggested `food_app/.env`:

```env
REACT_APP_BACKEND=flask
REACT_APP_API_URL_FLASK=http://localhost:5002
```

### 3. AI recipes (optional)

```bash
ollama pull qwen2.5:3b
# ensure Ollama is running on http://127.0.0.1:11434
```

Configure in `backend-flask/.env`:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:3b
```

## API overview

| Method | Path | Description |
|--------|------|-------------|
| POST | `/user/register` | Create account |
| POST | `/user/login` | Log in |
| GET | `/recipes/all` | List recipes |
| POST | `/recipes/create` | Create recipe |
| POST | `/recipes/update` | Update recipe |
| POST | `/recipes/delete/<id>` | Delete recipe |
| POST | `/recipes/generate` | AI-generate recipe JSON |

## Frontend routes

| Path | Page |
|------|------|
| `/site` | Landing |
| `/` | Home / recipes |
| `/login` | Login |
| `/signup` | Signup |
| `/profile` | Profile |
| `/details` | Recipe details |

## Scripts

**Frontend (`food_app`)**

- `npm start` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint

**Backend**

- `python app.py` — start Flask (port from `FLASK_PORT`, default `5002`)

## Notes

- Auth is demo-style (client session in `localStorage`); not production-hardened.
- Cloudinary is used for image uploads; configure credentials/presets as needed for your account.
- The frontend can target a Node API via env, but this repo ships the Flask backend.

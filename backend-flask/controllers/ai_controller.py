import json
import os
import re
import urllib.error
import urllib.request

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")

RECIPE_JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "ingredients": {"type": "array", "items": {"type": "string"}},
        "steps": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["title", "description", "ingredients", "steps"],
}


def _extract_json(text):
    cleaned = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", cleaned, re.IGNORECASE)
    if fence:
        cleaned = fence.group(1).strip()
    return json.loads(cleaned)


def _build_prompt(user_prompt, cuisine=None, difficulty=None, servings=None):
    extras = []
    if cuisine:
        extras.append(f"Cuisine/style: {cuisine}")
    if difficulty:
        extras.append(f"Difficulty: {difficulty}")
    if servings:
        extras.append(f"Servings: {servings}")
    context = "\n".join(extras)
    return f"""You are a professional recipe writer. Create one complete home-cooking recipe.

User request: {user_prompt}
{context}

Return ONLY valid JSON with this exact shape (no markdown, no commentary):
{{
  "title": "short recipe name",
  "description": "2-3 sentence appetizing summary",
  "ingredients": ["ingredient with amount", "..."],
  "steps": ["clear step 1", "clear step 2", "..."]
}}

Use 6-12 ingredients and 6-8 numbered-style steps. Be practical and specific."""


def _call_ollama(prompt):
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
        "format": RECIPE_JSON_SCHEMA,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{OLLAMA_BASE_URL}/api/generate",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))
    return body.get("response", "")


def generate_recipe(data):
    prompt = (data.get("prompt") or "").strip()
    if not prompt:
        return {"error": "Prompt is required"}, 400

    cuisine = (data.get("cuisine") or "").strip() or None
    difficulty = (data.get("difficulty") or "").strip() or None
    servings = (data.get("servings") or "").strip() or None

    try:
        raw = _call_ollama(_build_prompt(prompt, cuisine, difficulty, servings))
        recipe = _extract_json(raw)
    except urllib.error.URLError:
        return {
            "error": "Cannot reach Ollama. Start Ollama and run: ollama pull "
            + OLLAMA_MODEL,
        }, 503
    except (json.JSONDecodeError, KeyError, TypeError, ValueError):
        return {"error": "AI returned invalid recipe data. Try again."}, 502
    except Exception:
        return {"error": "Recipe generation failed"}, 500

    title = str(recipe.get("title", "")).strip()
    description = str(recipe.get("description", "")).strip()
    ingredients = recipe.get("ingredients") or []
    steps = recipe.get("steps") or []

    if not title or not description:
        return {"error": "AI recipe was incomplete"}, 502

    if not isinstance(ingredients, list) or not isinstance(steps, list):
        return {"error": "AI recipe was incomplete"}, 502

    ingredients = [str(i).strip() for i in ingredients if str(i).strip()]
    steps = [str(s).strip() for s in steps if str(s).strip()]

    if len(ingredients) < 2 or len(steps) < 2:
        return {"error": "AI recipe was incomplete"}, 502

    return {
        "title": title,
        "description": description,
        "ingredients": ingredients,
        "steps": steps,
    }, 200

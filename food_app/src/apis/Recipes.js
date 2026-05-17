import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "../config/api";

export async function getAllRecipes() {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recipes/all`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("hji");
    if (!response.ok) {
      throw new Error("error in getting recipes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error fetching recipes");
    throw error;
  }
}
export async function createRecipe(recipeData) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recipes/create`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error creating recipes");
    throw error;
  }
}
export async function deleteRecipe(id) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recipes/delete/${id}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("error in getting recipes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error fetching recipes");
    throw error;
  }
}
export async function generateRecipeWithAI({
  prompt,
  cuisine = "",
  difficulty = "",
  servings = "",
}) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recipes/generate`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, cuisine, difficulty, servings }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate recipe");
    }

    return data;
  } catch (error) {
    toast.error(error.message || "AI recipe generation failed");
    throw error;
  }
}

export async function updateRecipe(updateRecipe) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/recipes/update`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRecipe),
    });

    if (!response.ok) {
      throw new Error("error in getting recipes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error fetching recipes");
    throw error;
  }
}

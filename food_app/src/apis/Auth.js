import { toast } from "react-hot-toast";
import { getApiBaseUrl } from "../config/api";

export async function signUpUser(email, password, name) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/user/register`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error("may be user already exists or fields are empty");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error registering user");
    throw error;
  }
}
export async function signinUser(email, password) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/user/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("user don't exists");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error during Sign-in");
    throw error;
  }
}

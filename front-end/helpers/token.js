// tokenHelper.js

import { useRouter } from "next/navigation";

/**
 * Set token with expiry (milliseconds)
 */
export const setToken = (token, expiresIn = 3600 * 1000) => {
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", Date.now() + expiresIn);
};

/**
 * Get token and check if expired
 */
export const getToken = () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  if (!token || !tokenExpiry || Date.now() > tokenExpiry) {
    removeToken();
    return null;
  }

  return token;
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};

/**
 * Auto-remove token after expiry
 * Call this once when your app initializes
 */
export const autoExpireToken = (router) => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!tokenExpiry) return;

  const timeLeft = tokenExpiry - Date.now();

  if (timeLeft <= 0) {
    removeToken();
    alert("Session expired!");
    router.push("/"); // redirect to login
  } else {
    setTimeout(() => {
      removeToken();
      alert("Session expired!");
      router.push("/");
    }, timeLeft);
  }
};

const URLS = {
  node: process.env.REACT_APP_API_URL_NODE || "http://localhost:5001",
  flask: process.env.REACT_APP_API_URL_FLASK || "http://localhost:5002",
};

function resolveBackend() {
  const override = localStorage.getItem("API_BACKEND");
  if (override === "node" || override === "flask") {
    return override;
  }
  return process.env.REACT_APP_BACKEND || "flask";
}

export function getApiBaseUrl() {
  const backend = resolveBackend();
  return URLS[backend] ?? URLS.node;
}

export const API_BASE_URL = getApiBaseUrl();

export function setApiBackend(backend) {
  if (backend === "node" || backend === "flask") {
    localStorage.setItem("API_BACKEND", backend);
    window.location.reload();
  }
}

export function getActiveBackend() {
  return resolveBackend();
}

if (process.env.NODE_ENV === "development") {
  console.info(`API backend: ${resolveBackend()} → ${getApiBaseUrl()}`);
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function fetchFromApi(endpoint, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    throw new Error(
      err.message?.includes("fetch") || err.message?.includes("network")
        ? "Could not reach server. Make sure the backend is running on port 3001."
        : err.message || "Request failed"
    );
  }

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    let body = {};
    if (contentType.includes("application/json")) {
      body = await res.json().catch(() => ({}));
    }
    const message =
      body.error ||
      body.message ||
      (res.status === 502 ? "Backend unavailable. Is the server running on port 3001?" : null) ||
      (res.status === 404 ? "Endpoint not found. Check that the backend is running." : null) ||
      res.statusText ||
      "Request failed";
    throw new Error(message);
  }

  return res.json();
}

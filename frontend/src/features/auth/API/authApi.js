import { http } from "./http.js";

function unwrap(response) {
  return response.data.data;
}

export const authApi = {
  async login(credentials) {
    return unwrap(await http.post("/auth/login", credentials));
  },
  async register(details) {
    return unwrap(await http.post("/auth/register", details));
  },
  async refresh() {
    return unwrap(await http.post("/auth/refresh"));
  },
  async me(accessToken) {
    return unwrap(await http.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }));
  },
  async logout() {
    return http.post("/auth/logout");
  },
};

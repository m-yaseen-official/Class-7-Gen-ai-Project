import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: null,
    initialized: false,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.initialized = true;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    finishInitialization(state) {
      state.initialized = true;
    },
    clearCredentials(state) {
      state.accessToken = null;
      state.user = null;
      state.initialized = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  clearCredentials,
  finishInitialization,
  setCredentials,
  setError,
  setLoading,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

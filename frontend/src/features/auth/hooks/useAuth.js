import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../API/authApi.js";
import { getApiError } from "../API/http.js";
import {
  clearCredentials,
  finishInitialization,
  selectAuth,
  setCredentials,
  setError,
  setLoading,
} from "../state/authSlice.js";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const initialize = useCallback(async () => {
    if (auth.initialized) return;
    try {
      const session = await authApi.refresh();
      dispatch(setCredentials(session));
    } catch {
      dispatch(finishInitialization());
    }
  }, [auth.initialized, dispatch]);

  const authenticate = useCallback(async (operation, values) => {
    dispatch(setLoading(true));
    try {
      const session = await operation(values);
      dispatch(setCredentials(session));
      return true;
    } catch (error) {
      dispatch(setError(getApiError(error)));
      return false;
    }
  }, [dispatch]);

  const login = useCallback((credentials) => (
    authenticate(authApi.login, credentials)
  ), [authenticate]);

  const register = useCallback((details) => (
    authenticate(authApi.register, details)
  ), [authenticate]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      dispatch(clearCredentials());
    }
  }, [dispatch]);

  return { ...auth, initialize, login, register, logout };
}

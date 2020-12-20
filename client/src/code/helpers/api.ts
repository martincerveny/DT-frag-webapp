import axios, { AxiosInstance } from 'axios';
import { cookieExpiresInDays, cookieName } from '../constants/api';
import { set, getJSON, remove } from 'js-cookie';
import { MessageType, snackbarService } from 'uno-material-ui/dist';

/**
 * Return api settings
 */
export const getBasicSettings = () => {
  const data = getJSON(cookieName);
  let apiKey;

  if (data) {
    apiKey = { Authorization: `Bearer ${data.token}` };
  }

  return {
    baseURL: process.env.REACT_APP_API_URL,
    headers: apiKey,
  };
};

export let api: AxiosInstance;

/**
 * Refresh api with new settings
 */
export const refreshApi = () => {
  api = axios.create(getBasicSettings());
};

refreshApi();

/**
 * Save token and user ID to cookie
 */
export const saveUserToCookie = (token: string, id: number) => {
  set(
    cookieName,
    {
      token,
      id,
    },
    {
      expires: cookieExpiresInDays,
    },
  );
  refreshApi();
};

/**
 * Parse cookie
 */
export const receiveUserFromCookie = (): { token: string; id: number } | undefined => {
  const data = getJSON(cookieName);
  if (data) {
    const { token, id } = data;
    if (token != null && id != null) {
      return {
        token,
        id,
      };
    }
  }

  return undefined;
};

/**
 * Remove cookie
 */
export const removeUserFromCookie = () => {
  remove(cookieName);
};

/**
 * Notification message
 */
export const showMessage = (message: string, type: MessageType, duration: number = 7000) => {
  return snackbarService.showSnackbar(message, type, duration);
};

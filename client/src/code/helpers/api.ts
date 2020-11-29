import axios, { AxiosInstance } from 'axios';
import { getApiConfig } from './config';
import { cookieExpiresInDays, cookieName } from '../constants/api';
import { set, getJSON, remove } from 'js-cookie';
import { MessageType, snackbarService } from 'uno-material-ui/dist';

export const getBasicSettings = () => {
  const data = getJSON(cookieName);
  let apiKey;

  if (data) {
    apiKey = { Authorization: `Bearer ${data.token}` };
  }

  return {
    baseURL: getApiConfig().baseApiUrl,
    headers: apiKey,
  };
};

export let api: AxiosInstance;

export const refreshApi = () => {
  api = axios.create(getBasicSettings());
};

refreshApi();

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

export const removeUserFromCookie = () => {
  remove(cookieName);
};

export const showMessage = (message: string, type: MessageType, duration: number = 7000) => {
  return snackbarService.showSnackbar(message, type, duration);
};

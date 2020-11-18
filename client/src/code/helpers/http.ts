import axios from 'axios';
import { getApiConfig } from './config';
import {cookieExpiresInDays, cookieName} from "../constants/api";
import { set, get } from 'js-cookie';

export const http = axios.create({
  baseURL: getApiConfig().baseApiUrl,
});

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
};

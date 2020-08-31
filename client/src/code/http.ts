import axios from 'axios';
import { getApiConfig } from './config';

export const http = axios.create({
  baseURL: getApiConfig().baseApiUrl,
});

interface ApiConfig {
  baseApiUrl: string | undefined;
}

export const getApiConfig = (): ApiConfig => {
  return {
    baseApiUrl: process.env.REACT_APP_API_URL,
  };
};

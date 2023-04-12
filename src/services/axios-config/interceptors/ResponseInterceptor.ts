import { AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.config?.headers) {
    response.config.headers['Access-Control-Allow-Origin'] = 'https://great-volleyball-gold-ireland.bohr.io';
  }
  return response;
}

import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthorizationResponse } from '../types/authorization-response';

const UserService = {
  async checkAuthorization(): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
    }
    return [response, message];
  },
};

export default UserService;

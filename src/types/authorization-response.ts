export type User = {
  id: string;
  email: string;
  isActivated: boolean;
};

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

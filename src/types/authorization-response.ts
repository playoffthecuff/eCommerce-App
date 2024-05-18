export type User = {
  id: string | null;
  email: string | null;
  isActivated: boolean;
};

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

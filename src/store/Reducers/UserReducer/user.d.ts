export interface UIUser {
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;
}

export interface UIUserResponse {
  user: UIUser & { token: string };
}

export interface UIUserSlice {
  auth: boolean;
  user: UIUser;
  token: string;
  status: 'loading' | 'succeeded' | 'failed';
  error: {
    message: string | undefined;
    code: string | undefined;
  };
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface UserSession {
  id: number;
  email: string;
  name: string | null;
}

export type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterForm = LoginForm & {
  name: string;
};

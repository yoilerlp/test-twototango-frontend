export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};


export type PostToken = {
  username: string;
  password: string;
};

export type PostTokenResponse = {
  access_token: string;
  token_type: string;
};

export type PostTokenRequest = {
  username: string;
  password: string;
};

export type User = {
  email: string;
  name: string;
  image: string;
  is_company: boolean;
  id: string;
};

export type CreateUser = {
  email: string;
  name: string;
  image: string;
  is_company: boolean;
  password: string;
};

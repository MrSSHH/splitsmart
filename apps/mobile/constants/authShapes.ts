export type loginRequest = {
  email: string;
  password: string;
};

export type loginResponse = {
  access_token: string;
};

export type registerRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

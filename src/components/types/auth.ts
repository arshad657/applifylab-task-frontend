export type RegisterApiSuccess = {
  success: true;
  message: string;
};

export type RegisterApiError = {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type RegisterApiResponse = RegisterApiSuccess | RegisterApiError;

export type LoginApiSuccess = {
  success: true;
  message: string;
};

export type LoginApiError = {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type LoginApiResponse = LoginApiSuccess | LoginApiError;


export interface IUser {
  _id?: string;
  isAuth?: boolean;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  lastname?: string;
  role?: number;
  image?: string;
}

export interface IValidationErrors {
  errorMessage: string;
}

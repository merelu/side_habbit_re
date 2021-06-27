export interface IUser {
  _id: string;
  isAuth?: boolean;
  isAdmin?: boolean;
  name: string;
  email: string;
  lastname?: string;
  role?: number;
  image: string;
}

export interface IValidationErrors {
  errorMessage: string;
}

export interface IHabbit {
  _id: string;
  title: string;
  category: number;
  expiredDate: Date;
  writer: string;
  schedule: boolean[];
  checked: boolean;
}

export interface ICommit {
  _id?: string;
  writer: string;
  habbitId: string;
  title: string;
  category: number;
  createAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IuserDto {
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  sex: Sex;
}

export interface UpdateUserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  sex: Sex;
  password: string;
}

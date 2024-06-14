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
  // date_of_birth: string;
  role: UserRole;
  sex: Sex;
}

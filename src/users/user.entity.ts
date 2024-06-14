import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  // @Column()
  // date_of_birth: string;

  @Column({
    type: 'enum',
    enum: Sex,
    default: Sex.MALE,
  })
  sex: Sex;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}

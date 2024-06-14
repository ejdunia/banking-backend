import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethod {
  CARD = 'card',
  TRF = 'transfer',
  USSD = 'ussd',
}

export enum TransactionStatus {
  SUCCESS = 'successful',
  FAILED = 'failed',
  PENDING = 'pending',
}
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CARD,
  })
  PaymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  TransactionStatus: TransactionStatus;
}

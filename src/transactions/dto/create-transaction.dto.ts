import {
  ItransactionDto,
  TransactionStatus,
  PaymentMethod,
} from '../interfaces/transaction.interface';

import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto implements ItransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  updatedAt: string;

  @IsString()
  status: TransactionStatus;

  @IsString()
  payment_method: PaymentMethod;
}

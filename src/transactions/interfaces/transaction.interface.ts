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

export interface ItransactionDto {
  amount: number;
  payment_method: PaymentMethod;
  status: TransactionStatus;
  updatedAt: string;
}

export interface IupdateTransactionStatusDto {
  transaction_status: TransactionStatus;
}

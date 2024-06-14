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
  id: number;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

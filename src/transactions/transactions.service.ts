import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IupdateTransactionStatusDto } from './interfaces/transaction.interface';
import { log } from 'console';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findOne(id: number): Promise<Transaction | null> {
    // return `this shows the transactions of the user ${trxID}`;
    return this.transactionRepository.findOneBy({ id });
  }
  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    console.log(`creating transaction`);
    const transaction = new Transaction();
    transaction.amount = createTransactionDto.amount;
    transaction.payment_method = createTransactionDto.payment_method;
    transaction.transaction_status = createTransactionDto.status;
    return this.transactionRepository.save(transaction);
  }

  async updateTransaction(id: number, update: IupdateTransactionStatusDto) {
    let transaction = await this.transactionRepository.findOneBy({ id });
    // console.log(transaction);
    transaction = { ...transaction, ...update };
    return this.transactionRepository.save(transaction);
  }

  deleteTransaction(id: number) {
    const trx = this.transactionRepository.findOneBy({ id });
    console.log(trx);
  }
}

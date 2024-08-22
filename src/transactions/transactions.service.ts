import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IupdateTransactionStatusDto } from './interfaces/transaction.interface';

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

  async createTransaction(
    transactionData: CreateTransactionDto,
  ): Promise<Transaction> {
    console.log(`creating transaction`);
    const newTransaction = this.transactionRepository.create(transactionData);
    await this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async updateTransactionStatus(
    id: number,
    update: IupdateTransactionStatusDto,
  ) {
    let transaction = await this.transactionRepository.findOneBy({ id });
    transaction = { ...transaction, ...update };
    await this.transactionRepository.save(transaction);
    return transaction;

    // **IMPLEMENT THIS LATER**
    // async updatePost(id: number, post: UpdatePostDto) {
    //   await this.postsRepository.update(id, post);
    //   const updatedPost = await this.postsRepository.findOne(id);
    //   if (updatedPost) {
    //     return updatedPost
    //   }
    //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    // }
  }

  async deleteTransaction(id: number) {
    const trxToDelete = await this.transactionRepository.delete({ id });
    if (!trxToDelete) {
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    }
    console.log(trxToDelete);
  }
}

import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}
  @Get()
  getAllTrancactions() {
    return `this returns all transactins`;
  }

  @Post()
  createTransaction(@Body() transaction: CreateTransactionDto) {
    // console.log(`This creates a transaction`);
    // return { ...transaction };
    return this.transactionService.createTransaction(transaction);
  }

  @Delete(':id')
  deleteTrx() {
    return `this deletes a transaction`;
  }
}

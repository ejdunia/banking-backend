import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { IupdateTransactionStatusDto } from './interfaces/transaction.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}
  @Get()
  getAllTrancactions() {
    return `this returns all transactions`;
  }

  @Post()
  async createTransaction(@Body() transaction: CreateTransactionDto) {
    console.log(transaction);
    return this.transactionService.createTransaction(transaction);
  }

  @Put(':id')
  async updateTrx(
    @Param('id') id: string,
    @Body()
    update: IupdateTransactionStatusDto,
  ) {
    return await this.transactionService.updateTransactionStatus(
      Number(id),
      update,
    );
  }

  @Delete(':id')
  async deleteTrx(@Param('id') id: string) {
    return this.transactionService.deleteTransaction(Number(id));
  }
}

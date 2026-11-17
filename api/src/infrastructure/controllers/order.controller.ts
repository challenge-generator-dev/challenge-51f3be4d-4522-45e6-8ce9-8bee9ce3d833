// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Put, Get, Delete, Body, Param, Res, HttpStatus, Req, Request } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Put');
  }

  @Get(':id')
  async get(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Get');
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }
}
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalesDocumentItemDto } from './dto/create-sales-document-item.dto';
import { UpdateSalesDocumentItemDto } from './dto/update-sales-document-item.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { SalesDocumentItemFilter } from './dto/find-sales-document-item.dto';

@Injectable()
export class SalesDocumentItemsService {
  constructor(private prismaService: PrismaService) {}

  async create(documentId: string, createDto: CreateSalesDocumentItemDto) {
      try {
          const result = await this.prismaService.salesDocumentItem.create({
              data: {
                  ...createDto,
                  salesDocumentId: documentId,
              },
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                  throw new BadRequestException(
                      'A sales document item with this unique field already exists',
                  );
              }
          }
          throw new InternalServerErrorException('Failed to create sales document item');
      }
  }

  async findMany(documentId: string, filter: SalesDocumentItemFilter) {
      try {
          const items = await this.prismaService.salesDocumentItem.findMany({
              where: {
                  salesDocumentId: documentId,
                  description: filter.description
                      ? { contains: filter.description, mode: 'insensitive' }
                      : undefined,
              },
          });

          return items;
      } catch (error) {
          throw new InternalServerErrorException('Failed to find sales document items');
      }
  }

  async findOne(documentId: string, itemId: string) {
      try {
          const item = await this.prismaService.salesDocumentItem.findUnique({
              where: { id: itemId, salesDocumentId: documentId },
          });

          if (!item) {
              throw new NotFoundException(`Sales document item with ID ${itemId} not found`);
          }

          return item;
      } catch (error) {
          if (error instanceof NotFoundException) throw error;
          throw new InternalServerErrorException('Failed to find sales document item');
      }
  }

  async update(documentId: string, itemId: string, updateDto: UpdateSalesDocumentItemDto) {
      try {
          const result = await this.prismaService.salesDocumentItem.update({
              where: { id: itemId, salesDocumentId: documentId },
              data: updateDto,
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2025') {
                  throw new BadRequestException(`Sales document item with ID ${itemId} not found`);
              }
          }
          throw new InternalServerErrorException('Failed to update sales document item');
      }
  }

  async delete(documentId: string, itemId: string) {
      try {
          const result = await this.prismaService.salesDocumentItem.delete({
              where: { id: itemId, salesDocumentId: documentId },
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2025') {
                  throw new BadRequestException(`Sales document item with ID ${itemId} not found`);
              }
          }
          throw new InternalServerErrorException('Failed to remove sales document item');
      }
  }
}
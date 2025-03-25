import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';
import { FileFilter } from './dto/find-file.dto';

@Injectable()
export class FilesService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: string, createDto: CreateFileDto) {
      try {
          const result = await this.prismaService.file.create({
              data: {
                  ...createDto,
                  userId,
              },
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2002') {
                  throw new BadRequestException(
                      'A file with this unique field already exists',
                  );
              }
          }
          throw new InternalServerErrorException('Failed to create file');
      }
  }

  async findMany(userId: string, filter: FileFilter) {
      try {
          const files = await this.prismaService.file.findMany({
              where: {
                  userId,
                  originalFilename: filter.filename
                      ? { contains: filter.filename, mode: 'insensitive' }
                      : undefined,
                  fileCategory: filter.category || undefined,
              },
          });

          return files;
      } catch (error) {
          throw new InternalServerErrorException('Failed to find files');
      }
  }

  async findOne(userId: string, fileId: string) {
      try {
          const file = await this.prismaService.file.findUnique({
              where: { id: fileId, userId },
          });

          if (!file) {
              throw new NotFoundException(`File with ID ${fileId} not found`);
          }

          return file;
      } catch (error) {
          if (error instanceof NotFoundException) throw error;
          throw new InternalServerErrorException('Failed to find file');
      }
  }

  async update(userId: string, fileId: string, updateDto: UpdateFileDto) {
      try {
          const result = await this.prismaService.file.update({
              where: { id: fileId, userId },
              data: updateDto,
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2025') {
                  throw new BadRequestException(`File with ID ${fileId} not found`);
              }
          }
          throw new InternalServerErrorException('Failed to update file');
      }
  }

  async delete(userId: string, fileId: string) {
      try {
          const result = await this.prismaService.file.delete({
              where: { id: fileId, userId },
          });
          return result;
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              if (error.code === 'P2025') {
                  throw new BadRequestException(`File with ID ${fileId} not found`);
              }
          }
          throw new InternalServerErrorException('Failed to remove file');
      }
  }
}

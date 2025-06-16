import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { EditUserDto } from 'freelanceman-common';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(userId: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: userId },
                include: {
                    visitingStatus: true
                }
            });
            if (!user)
                throw new NotFoundException(`User ID ${userId} not found`);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to find user');
        }
    }

    async update(userId: string, editUserDto: EditUserDto) {
        try {
            await this.prismaService.user.update({
                where: { id: userId },
                data: editUserDto,
            });
            return await this.findOne(userId);
        } catch (error) {
            console.log('error', error)
            throw new InternalServerErrorException('Failed to update user');
        }
    }

    async setVisited(userId: string, page: string) {
        try {
            await this.prismaService.visitingStatus.update({
                where: {
                    userId: userId,
                },
                data: {
                    [page]: true,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to set visited status',
            );
        }
    }
}

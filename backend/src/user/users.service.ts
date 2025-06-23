import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { EditUserDto } from 'freelanceman-common';
import { removeUndefined } from '@/helpers/remove-undefined';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(userId: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: userId },
                include: {
                    visitingStatus: true,
                },
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
        const cleanDto = removeUndefined(editUserDto);
        try {
            await this.prismaService.user.update({
                where: { id: userId },
                data: cleanDto,
            });
            return await this.findOne(userId);
        } catch (error) {
            console.log('error', error);
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

    async delete(userId: string) {
        try {
            await this.prismaService.user.delete({
                where: { id: userId },
            });
            return { message: `User ID ${userId} deleted successfully` };
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete user');
        }
    }
}

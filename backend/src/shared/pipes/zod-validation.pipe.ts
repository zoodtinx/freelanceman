import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: any) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            console.error('Zod validation failed for request body');
            throw new BadRequestException(result.error.format());
        }
        return result.data;
    }
}

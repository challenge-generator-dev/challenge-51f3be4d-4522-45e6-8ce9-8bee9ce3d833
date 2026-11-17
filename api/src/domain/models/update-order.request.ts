import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderRequest {
    @IsString()
    @IsNotEmpty()
    status: string;

    constructor(status: string) {
        if (!status || status.trim() === '') {
            throw new Error('Status cannot be empty');
        }
        this.status = status;
    }
}
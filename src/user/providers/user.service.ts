import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { MESSAGES, RESULT_STATUS } from '../../shared/constants';
import { plainToClass } from 'class-transformer';
import { UserInfoOutput } from '../dtos/user-info-output.dto';
import { UserInfoUpdateInput } from '../dtos/user-infor-update-input.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }


    async getUserInfo(userId: string) {
        const userById = await this.userRepo.findOne({
            where: {
                id: userId
            },
        });

        const output = plainToClass(UserInfoOutput, userById, {
            excludeExtraneousValues: true,
        });

        return {
            status: RESULT_STATUS.SUCCEED,
            error: false,
            data: output,
            code: 0,
            message: MESSAGES.OK,
        };
    }

    async updateUserInfo(userId: string, updateInput: UserInfoUpdateInput) {
        const userById = await this.userRepo.findOne({
            where: {
                id: userId
            },
        });

        await this.userRepo.update(userById.id, {
            ...updateInput
        })

        return {
            status: RESULT_STATUS.SUCCEED,
            error: false,
            data: null,
            code: 0,
            message: MESSAGES.OK,
        };
    }
}

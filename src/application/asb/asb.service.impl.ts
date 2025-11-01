import { Injectable } from '@nestjs/common';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { CreateAsbUseCase } from './use_cases/create_asb.use_case';
import { CreateAsbDto } from '../../presentation/asb/dto/create_asb.dto';
import { Asb } from '../../domain/asb/asb.entity';
import { AsbService } from 'src/domain/asb/asb.service';

@Injectable()
export class AsbServiceImpl implements AsbService {
    private readonly createAsbUseCase: CreateAsbUseCase;

    constructor(private readonly asbRepo: AsbRepository) {
        this.createAsbUseCase = new CreateAsbUseCase(asbRepo);
    }

    async create(data: CreateAsbDto): Promise<Asb> {
        return this.createAsbUseCase.execute(data);
    }
}

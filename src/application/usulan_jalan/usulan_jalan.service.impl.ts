import { Injectable } from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { CreateUsulanJalanDto } from './dto/create_usulan_jalan.dto';
import { UsulanJalanStatus } from '../../domain/usulan_jalan/usulan_jalan_status.enum';

@Injectable()
export class UsulanJalanServiceImpl extends UsulanJalanService {
    constructor(private readonly repo: UsulanJalanRepository) {
        super();
    }

    async create(dto: CreateUsulanJalanDto) {
        return this.repo.create({
            ...dto,
            status: UsulanJalanStatus.PENDING,
        });
    }
}

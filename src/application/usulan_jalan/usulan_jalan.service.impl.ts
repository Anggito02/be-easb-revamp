import { Injectable, NotFoundException } from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { CreateUsulanJalanDto } from './dto/create_usulan_jalan.dto';
import { UsulanJalanStatus } from '../../domain/usulan_jalan/usulan_jalan_status.enum';
import { UsulanJalan } from 'src/domain/usulan_jalan/usulan_jalan.entity';

@Injectable()
export class UsulanJalanServiceImpl extends UsulanJalanService {
    constructor(private readonly repo: UsulanJalanRepository) {
        super();
    }

    async create(dto: CreateUsulanJalanDto): Promise<UsulanJalan> {
        return this.repo.create({
            ...dto,
            status: UsulanJalanStatus.PENDING,
        });
    }

    async findById(id: number): Promise<UsulanJalan> {
        const found = await this.repo.findById(id);
        if (!found) {
            throw new NotFoundException(`Usulan jalan dengan id ${id} tidak ditemukan`);
        }
        return found;
    }

    async findAll(page: number, amount: number): Promise<{ data: UsulanJalan[]; total: number; page: number; amount: number; totalPages: number }> {
        const p = page && page > 0 ? page : 1;
        const a = amount && amount > 0 ? amount : 10;

        const result = await this.repo.findAll(p, a);
        const totalPages = Math.ceil(result.total / a);

        return {
            data: result.data,
            total: result.total,
            page: p,
            amount: a,
            totalPages,
        };
    }
}

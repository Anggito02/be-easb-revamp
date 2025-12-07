import { Body, Controller, Post } from '@nestjs/common';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { CreateUsulanJalanDto } from '../../application/usulan_jalan/dto/create_usulan_jalan.dto';

@Controller('usulan-jalan')
export class UsulanJalanController {
    constructor(private readonly service: UsulanJalanServiceImpl) {}

    @Post()
    async create(@Body() dto: CreateUsulanJalanDto) {
        return this.service.create(dto);
    }
}

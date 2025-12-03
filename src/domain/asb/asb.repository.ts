import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';

export abstract class AsbRepository {
    abstract findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null>;
    abstract findAll(dto: FindAllAsbDto, idOpd?: number): Promise<{ data: AsbWithRelationsDto[]; total: number }>;
}

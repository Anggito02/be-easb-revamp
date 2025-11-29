import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';

export abstract class AsbRepository {
    abstract findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null>;
}

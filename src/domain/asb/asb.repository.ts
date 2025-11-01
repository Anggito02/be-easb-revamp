// domain/asb/asb.repository.ts
import { Asb } from './asb.entity';
export interface AsbRepository {
    create(asb: Asb): Promise<Asb>;
    update(asb: Asb): Promise<Asb>;
    findById(id: number): Promise<Asb | null>;
}

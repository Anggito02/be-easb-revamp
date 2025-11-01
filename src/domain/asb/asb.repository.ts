import { Asb } from './asb.entity';
export abstract class AsbRepository {
    abstract create(asb: Asb): Promise<Asb>;
}

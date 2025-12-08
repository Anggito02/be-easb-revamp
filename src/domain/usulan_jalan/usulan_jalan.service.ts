import { UsulanJalan } from './usulan_jalan.entity';

export abstract class UsulanJalanService {
    abstract create(usulan: Partial<UsulanJalan>): Promise<UsulanJalan>;
    abstract findById(id: number): Promise<UsulanJalan>;
}

import { Role } from '../user/user_role.enum';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';

export abstract class AsbService {
    abstract findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null>;
}

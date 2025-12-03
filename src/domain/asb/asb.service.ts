import { Role } from '../user/user_role.enum';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';
import { AsbListResultDto } from 'src/application/asb/dto/asb_list_result.dto';

export abstract class AsbService {
    abstract findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null>;
    abstract findAll(dto: FindAllAsbDto, userIdOpd: number | null, userRoles: Role[]): Promise<AsbListResultDto>;
}

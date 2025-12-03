import { Role } from '../user/user_role.enum';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';
import { AsbListResultDto } from 'src/application/asb/dto/asb_list_result.dto';
import { CreateAsbStoreIndexDto } from 'src/application/asb/dto/create_asb_store_index.dto';
import { UpdateAsbStoreIndexDto } from 'src/application/asb/dto/update_asb_store_index.dto';
import { UpdateAsbStoreLantaiDto } from 'src/application/asb/dto/update_asb_store_lantai.dto';

export abstract class AsbService {
    abstract findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null>;
    abstract findAll(dto: FindAllAsbDto, userIdOpd: number | null, userRoles: Role[]): Promise<AsbListResultDto>;
    abstract createIndex(dto: CreateAsbStoreIndexDto, files: Array<Express.Multer.File>, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract updateIndex(dto: UpdateAsbStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
    abstract deleteAsb(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }>;
    abstract storeLantai(dto: UpdateAsbStoreLantaiDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }>;
}

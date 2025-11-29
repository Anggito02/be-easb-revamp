import { AsbDetail } from './asb_detail.entity';
import { Files } from './files.enum';
import { CreateAsbDetailDto } from '../../application/asb_detail/dto/create_asb_detail.dto';
import { UpdateAsbDetailDto } from '../../application/asb_detail/dto/update_asb_detail.dto';
import { GetAsbDetailByAsbDto } from '../../presentation/asb_detail/dto/get_asb_detail_by_asb.dto';

export abstract class AsbDetailService {
    abstract create(dto: CreateAsbDetailDto): Promise<AsbDetail>;
    abstract update(dto: UpdateAsbDetailDto): Promise<AsbDetail>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbDetail>;
    abstract getByFileType(files: Files): Promise<AsbDetail[]>;
    abstract getByAsb(dto: GetAsbDetailByAsbDto): Promise<{ data: AsbDetail[], total: number, page: number, amount: number, totalPages: number }>;
}

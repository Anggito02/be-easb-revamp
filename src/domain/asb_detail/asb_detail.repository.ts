import { AsbDetail } from './asb_detail.entity';
import { Files } from './files.enum';
import { CreateAsbDetailDto } from '../../application/asb_detail/dto/create_asb_detail.dto';
import { UpdateAsbDetailDto } from '../../application/asb_detail/dto/update_asb_detail.dto';

export abstract class AsbDetailRepository {
    abstract create(dto: CreateAsbDetailDto): Promise<AsbDetail>;
    abstract update(dto: UpdateAsbDetailDto): Promise<AsbDetail>;
    abstract delete(id: number): Promise<void>;
    abstract findById(id: number): Promise<AsbDetail | null>;
    abstract findByFileType(files: Files): Promise<AsbDetail[]>;
}

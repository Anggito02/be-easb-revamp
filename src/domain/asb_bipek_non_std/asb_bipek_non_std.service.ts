import { AsbBipekNonStd } from './asb_bipek_non_std.entity';
import { CreateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/create_asb_bipek_non_std.dto';
import { UpdateAsbBipekNonStdDto } from '../../application/asb_bipek_non_std/dto/update_asb_bipek_non_std.dto';

export abstract class AsbBipekNonStdService {
    abstract create(dto: CreateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<AsbBipekNonStd>;
}

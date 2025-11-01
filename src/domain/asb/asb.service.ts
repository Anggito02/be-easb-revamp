import { CreateAsbDto } from 'src/presentation/asb/dto/create_asb.dto';
import { Asb } from './asb.entity';
export abstract class AsbService {
    abstract create(asb: CreateAsbDto): Promise<Asb>;
}
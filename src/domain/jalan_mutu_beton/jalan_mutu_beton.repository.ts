import { CreateJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/create_jalan_mutu_beton.dto";
import { JalanMutuBeton } from "./jalan_mutu_beton.entity";
import { UpdateJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/update_jalan_mutu_beton.dto";
import { GetJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/get_jalan_mutu_beton.dto";

export abstract class JalanMutuBetonRepository {
    abstract create(dto: CreateJalanMutuBetonDto): Promise<JalanMutuBeton>;
    abstract update(dto: UpdateJalanMutuBetonDto): Promise<JalanMutuBeton>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanMutuBeton | null>;
    abstract findAll(dto: GetJalanMutuBetonDto): Promise<{data: JalanMutuBeton[], total: number}>;
}

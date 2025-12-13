import { CreateJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/create_jalan_mutu_beton.dto";
import { JalanMutuBeton } from "./jalan_mutu_beton.entity";
import { UpdateJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/update_jalan_mutu_beton.dto";
import { GetJalanMutuBetonDto } from "src/presentation/jalan_mutu_beton/dto/get_jalan_mutu_beton.dto";
import { JalanMutuBetonPaginationResultDto } from "src/presentation/jalan_mutu_beton/dto/jalan_mutu_beton_pagination_result.dto";

export abstract class JalanMutuBetonService {
    abstract create(dto: CreateJalanMutuBetonDto): Promise<JalanMutuBeton>;
    abstract update(dto: UpdateJalanMutuBetonDto): Promise<JalanMutuBeton>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanMutuBeton | null>;
    abstract findAll(dto: GetJalanMutuBetonDto): Promise<JalanMutuBetonPaginationResultDto>;
}

import { CreateJalanRuangLingkupPerkerasanLenturDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/create_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { JalanRuangLingkupPerkerasanLentur } from "./jalan_ruang_lingkup_perkerasan_lentur.entity";
import { UpdateJalanRuangLingkupPerkerasanLenturDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/update_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { GetJalanRuangLingkupPerkerasanLenturDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/get_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { JalanRuangLingkupPerkerasanLenturPaginationResultDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/jalan_ruang_lingkup_perkerasan_lentur_pagination_result.dto";

export abstract class JalanRuangLingkupPerkerasanLenturService {
    abstract create(dto: CreateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur>;
    abstract update(dto: UpdateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanRuangLingkupPerkerasanLentur | null>;
    abstract findAll(dto: GetJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLenturPaginationResultDto>;
    abstract findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanLentur | null>;
}

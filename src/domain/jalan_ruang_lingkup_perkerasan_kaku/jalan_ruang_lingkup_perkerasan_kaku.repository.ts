import { CreateJalanRuangLingkupPerkerasanKakuDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/create_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { JalanRuangLingkupPerkerasanKaku } from "./jalan_ruang_lingkup_perkerasan_kaku.entity";
import { UpdateJalanRuangLingkupPerkerasanKakuDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/update_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { GetJalanRuangLingkupPerkerasanKakuDto } from "src/presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/get_jalan_ruang_lingkup_perkerasan_kaku.dto";

export abstract class JalanRuangLingkupPerkerasanKakuRepository {
    abstract create(dto: CreateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku>;
    abstract update(dto: UpdateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanRuangLingkupPerkerasanKaku | null>;
    abstract findAll(dto: GetJalanRuangLingkupPerkerasanKakuDto): Promise<{data: JalanRuangLingkupPerkerasanKaku[], total: number}>;
    abstract findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanKaku | null>;
}

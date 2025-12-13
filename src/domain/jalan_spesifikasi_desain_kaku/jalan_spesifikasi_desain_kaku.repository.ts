import { CreateJalanSpesifikasiDesainKakuDto } from "src/presentation/jalan_spesifikasi_desain_kaku/dto/create_jalan_spesifikasi_desain_kaku.dto";
import { JalanSpesifikasiDesainKaku } from "./jalan_spesifikasi_desain_kaku.entity";
import { UpdateJalanSpesifikasiDesainKakuDto } from "src/presentation/jalan_spesifikasi_desain_kaku/dto/update_jalan_spesifikasi_desain_kaku.dto";
import { GetJalanSpesifikasiDesainKakuDto } from "src/presentation/jalan_spesifikasi_desain_kaku/dto/get_jalan_spesifikasi_desain_kaku.dto";

export abstract class JalanSpesifikasiDesainKakuRepository {
    abstract create(dto: CreateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku>;
    abstract update(dto: UpdateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSpesifikasiDesainKaku | null>;
    abstract findAll(dto: GetJalanSpesifikasiDesainKakuDto): Promise<{data: JalanSpesifikasiDesainKaku[], total: number}>;
    abstract findBySpec(spec: string): Promise<JalanSpesifikasiDesainKaku | null>;
}

import { CreateJalanSpesifikasiDesainLenturDto } from "src/presentation/jalan_spesifikasi_desain_lentur/dto/create_jalan_spesifikasi_desain_lentur.dto";
import { JalanSpesifikasiDesainLentur } from "./jalan_spesifikasi_desain_lentur.entity";
import { UpdateJalanSpesifikasiDesainLenturDto } from "src/presentation/jalan_spesifikasi_desain_lentur/dto/update_jalan_spesifikasi_desain_lentur.dto";
import { GetJalanSpesifikasiDesainLenturDto } from "src/presentation/jalan_spesifikasi_desain_lentur/dto/get_jalan_spesifikasi_desain_lentur.dto";
import { JalanSpesifikasiDesainLenturPaginationResultDto } from "src/presentation/jalan_spesifikasi_desain_lentur/dto/jalan_spesifikasi_desain_lentur_pagination_result.dto";

export abstract class JalanSpesifikasiDesainLenturService {
    abstract create(dto: CreateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur>;
    abstract update(dto: UpdateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSpesifikasiDesainLentur | null>;
    abstract findAll(dto: GetJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLenturPaginationResultDto>;
}

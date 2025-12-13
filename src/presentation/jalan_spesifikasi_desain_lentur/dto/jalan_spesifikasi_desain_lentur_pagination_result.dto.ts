import { JalanSpesifikasiDesainLentur } from "../../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.entity";

export class JalanSpesifikasiDesainLenturPaginationResultDto {
    data!: JalanSpesifikasiDesainLentur[];
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}
